const net = require('net')

class Response {
  constructor (socket) {
    if (socket instanceof net.Socket) {
      this.socket = socket
      this.version = Response.version
      this.statusCode = Response.DEFAULT_STATUS_CODE
      this.statusText = Response.DEFAULT_STATUS_TEXT
      this.header = {}
      this.body = ''
    } else {
      throw new TypeError(Response.CONSTRUCT_ERROR)
    }
  }

  setHeader (k, v) {
    this.header[String(k).trim()] = String(v).trim()
  }

  setStatusCode (code) {
    this.statusCode = code
  }

  setStatusText (text) {
    this.statusText = text
  }

  send (body = '') {
    this.body = body
    this.setHeader('Content-Length', body.length)
    this.socket.write(this.toString())
  }

  toString () {
    let responseLine = [
      this.version,
      this.statusCode,
      this.statusText
    ].join(' ')

    let header = []
    Object.keys(this.header).forEach(k => {
      let v = this.header[k]
      header.push([k, v].join(': '))
    })

    return [
      responseLine, '\r\n',
      header.join('\r\n'), '\r\n',
      '\r\n',
      this.body
    ].join('')
  }
}

Response.version = 'HTTP/1.1'
Response.DEFAULT_STATUS_CODE = 200
Response.DEFAULT_STATUS_TEXT = 'OK'
Response.CONSTRUCT_ERROR = 'instanceof net.Socket expacted.'

module.exports = Response
