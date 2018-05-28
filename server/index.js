require('@conjurelabs/utils/process/handle-exceptions')

// first running any synchronous setup
const setup = require('./setup')

// dependencies
const config = require('conjure-core/modules/config')
const express = require('express')
const nextApp = require('./next')
const compression = require('compression')
const morgan = require('morgan')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const { ContentError } = require('@conjurelabs/err')
const log = require('conjure-core/modules/log')()

// constants
const port = config.app.web.port
const server = express()

if (process.env.NODE_ENV !== 'production') {
  // this results in full stacktraces, when not in prod
  Error.stackTraceLimit = Infinity
}
// override node time
process.env.TZ = 'America/Los_Angeles'

// basic server config
server.set('port', port)
server.use(morgan('combined'))

// server passport cookie config
server.use(cookieSession({
  name: 'conjure',
  secret: config.session.secret,

  // cookie options
  domain: process.env.NODE_ENV === 'production' ? '.conjure.sh' : `.${config.app.api.domain}`,
  httpOnly: true,
  maxAge: config.session.duration
}))

// server passport config
server.use(passport.initialize())
server.use(passport.session())
server.use(cookieParser())

// see https://github.com/zeit/next.js/issues/3890#issuecomment-383167281
server.use(compression())

// passport serialization
passport.serializeUser((user, done) => {
  const { DatabaseRow } = require('@conjurelabs/db')
  done(null, new DatabaseRow('account', user))
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

const forcedRedirectRouter = express.Router()
forcedRedirectRouter.get('*', (req, res, next) => {
  // aws healthcheck allow through, regardless
  if (req.url === '/aws/ping' && req.headers['user-agent'] === 'ELB-HealthChecker/2.0') {
    return next()
  }

  let acceptedProtocol = false
  let acceptedHost = false

  if (req.headers) {
    if (req.headers['x-forwarded-proto'] === config.app.web.protocol) {
      acceptedProtocol = true
    }
    if (req.headers.host === config.app.web.host) {
      acceptedHost = true
    }
  }

  if (acceptedProtocol && acceptedHost) {
    return next()
  }

  res.redirect(`${config.app.web.url}${req.url}`)
})
server.use(forcedRedirectRouter)

// tracking req state (like ip address)
server.use((req, res, next) => {
  req.state = {} // used to track anything useful, along the lifetime of a request
  req.state.remoteAddress = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.connection.remoteAddress

  next()
})

const robotsRouter = express.Router()
robotsRouter.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain')

  if (req.headers.host === config.app.web.host) {
    return res.send(
`User-agent: *
Disallow: /?org=
`
    )
  }
  
  res.send(
`User-agent: *
Disallow: /
`
  )
})

server.use(robotsRouter)

// cookie helper extensions
server.use((req, res, next) => {
  const { cipherAlgorithm, cipherSecret, hmacAlgorithm, hmacSecret } = config.cookies.secure

  const signedEncryption = require('@conjurelabs/utils/crypto/signed-encryption')
  const encryptor = signedEncryption(cipherAlgorithm, cipherSecret).withHmac(hmacAlgorithm, hmacSecret)

  const originalCookieMethod = res.cookie
  res.cookie = function cookie(name, data, options = {}) => {
    originalCookieMethod(name, data, {
      domain: process.env.NODE_ENV === 'production' ? '.conjure.sh' : `.${config.app.api.domain}`,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
      ...options
    })
  }
  res.cookie = res.cookie.bind(originalCookieMethod)

  res.cookieSecure = (name, data, ...extraArgs) => {
    if (typeof data !== 'string') {
      throw new ContentError('expected string for res.cookieSecure()')
    }

    res.cookie(name, encryptor.encrypt(data), ...extraArgs)
  }

  req.cookieSecure = name => {
    const cookieVal = req.cookies[name]
    if (!cookieVal) {
      return cookieVal
    }

    let decrypted

    try {
      decrypted = encryptor.decrypt(cookieVal)
    } catch(err) {
      log.error(err)
      return undefined
    }

    return decrypted
  }

  next()
})

// next.js extensions
server.use((req, res, next) => {
  res.render = (pageName, params = {}) => {
    nextApp.render(req, res, pageName, {
      ...params,
      meta: {
        gdprCookies: req.state.gdprCookies || false
      }
    })
  }

  next()
})

// container routes (to view web or logs)
server.use(require('./container-routes'))

// initialize routes
server.use(setup.routes)

// any non-caught GET route then goes on to the nextjs handler
const catchAllRouter = express.Router()
const nextDefaultGetHandler = nextApp.getRequestHandler()
catchAllRouter.get('*', (req, res) => {
  nextDefaultGetHandler(req, res)
})
server.use(catchAllRouter)

// startup next app
nextApp
  .prepare()
  .then(() => {
    // startup express
    server.listen(port, () => {
      log.info(`listening on :${port}`)
    })
  })
