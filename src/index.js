const net = require('net')
const port = 8888

const response = `HTTP/1.1 200 OK
Content-Length: 13
Server: jzz
Connection: keep-alive
Cache-Control: no-cache
Content-type: application/json

{ "msg": OK }
`

const server = net.createServer((socket) => {
  console.log(`[${new Date().toLocaleString()}]`, 'client connected!')
  socket.on('data', (data) => {
    console.log('[data] >>>>>')
    console.log(data instanceof Buffer ? data.toString() : data)
    console.log('[data] <<<<<')
    socket.write(response)
  })
})

server.on('close', () => {
  console.log(`[${new Date().toLocaleString()}]`, 'client disconnected!')
})

server.on('error', (err) => {
  console.log(`[${new Date().toLocaleString()}]`, 'error occured, ', err.message)
})

server.listen(port, () => {
  console.log(`listening ${port}`)
})
