class Request {
  constructor (str) {
    if (typeof str === 'string') {
      let [ headers, body ] = str.split('\r\n\r\n')

      headers = headers.split('\r\n')

      let requestLine = headers.shift()
      let [ method, URI, version ] = requestLine.split(' ')

      this.method = method
      this.URI = URI
      this.version = version
      this.header = {}

      headers.forEach((header) => {
        let [fieldName, fieldValue] = header.split(': ')
        this.header[fieldName.trim()] = fieldValue.trim()
      })

      this.body = body
    } else {
      throw new TypeError(Request.CONSTRUCT_ERROR)
    }
  }

  toString () {
    let requestLine = [ this.method, this.URI, this.version ].join(' ')
    let header = Object.entries(this.header).reduce((str, header) => {
      return str + header.join(': ') + '\r\n'
    }, '')

    return [ requestLine, header, this.body ].join('\r\n')
  };
}

Request.CONSTRUCT_ERROR = 'Invaild raw request.'

module.exports = Request
