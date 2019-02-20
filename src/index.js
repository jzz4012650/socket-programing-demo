const http = require('./http')
const port = 8888

const server = http.createServer((req, res) => {
  console.log(req)
  res.send('hello ' + req.body)
})

server.on('error', (err) => {
  console.log(`[${new Date().toLocaleString()}]`, 'error occured, ', err.message)
})

server.listen(port, () => {
  console.log(`listening ${port}`)
})
