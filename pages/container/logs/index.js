import io from 'socket.io-client'
import styles, { classes } from './styles.js'

import Page from 'components/Page'

export default class ContainerLogs extends Page {
  constructor(props) {
    super(props)

    this.state = {
      logsContent: ''
    }

    this.socket = null
  }

  componentDidMount() {
    const { host, containerUid, sessionKey } = this.props

    console.log({ host, containerUid, sessionKey })

    console.log(`${host}/container/logs`)
    const socket = io(`${host}/container/logs`)

    socket.emit('auth', {
      containerUid,
      sessionKey
    })

    socket.on('out', content => {
      this.setState({
        logsContent: this.state.logsContent + content
      })
    })

    socket.on('err', content => {
      this.setState({
        logsContent: this.state.logsContent + content
      })
    })

    this.socket = socket
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    return (
      <this.Layout
        title='Logs'
      >
        <div className={classes.content}>
          <pre dangerouslySetInnerHTML={{ __html: styledContent(this.state.logsContent) }} />
        </div>

        {styles}
      </this.Layout>
    )
  }
}

import AnsiConverter from 'ansi-to-html'
const converter = new AnsiConverter({
  fg: '#000',
  bg: '#FFF'
})

function styledContent(content) {
  return converter.toHtml(content)
}
