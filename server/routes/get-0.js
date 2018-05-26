const Route = require('@conjurelabs/route')
const geoip = require('geoip-lite')

const route = new Route({
  wildcard: true
})

const GdprCountryCodes = [
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DE', // Germany
  'DK', // Denmark
  'EE', // Estonia
  'ES', // Spain
  'FI', // Finland
  'FR', // France
  'GB', // United Kingdom
  'GR', // Greece
  'HR', // Croatia
  'HU', // Hungary
  'IE', // Ireland
  'IT', // Italy
  'LT', // Lithuania
  'LU', // Luxembourg
  'LV', // Latvia
  'MT', // Malta
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SE', // Sweden
  'SI', // Slovenia
  'SK'  // Slovakia
]

/*
  Logged-out landing page
 */
route.push((req, res, next) => {
  // see if user already ack'd cookies
  if (req.cookies['conjure-cookies'] && req.cookies['conjure-cookies'] === 'ack') {
    req.state.gdprCookies = false
    return next()
  }

  try {
    if (GdprCountryCodes.includes(geoip.lookup(req.remoteAddress).country.toUpperCase())) {
      req.state.gdprCookies = true
    } else {
      req.state.gdprCookies = false
    }
  } catch(err) {
    req.state.gdprCookies = false
  }

  next()
})

module.exports = route
