const net = require('net')
const Request = require('./Request')
const Response = require('./Response')
const http = {}

http.createServer = (handler) => {
  const httpServer = net.createServer((socket) => {
    socket.on('data', (data) => {
      const req = new Request(data.toString())
      const res = new Response(socket)
      handler(req, res)
    })
  })

  return httpServer
}

module.exports = http
