const net = require('net')
const assert = require('assert')
const sinon = require('sinon')
const Response = require('../../src/http/Response')

describe('Response', () => {
  const socket = new net.Socket()
  const write = sinon.stub(socket, 'write')

  it('能够正常创建', () => {
    let res = new Response(socket)
    assert.ok(true)
  })

  it('能够正确配置各个字段，并转为正确的字符串', () => {
    const res = new Response(socket)
    const statusCode = 404
    const statusText = 'not found'
    let resStr
    write.callsFake((content) => {
      resStr = content
    })
    res.setStatusCode(statusCode)
    res.setStatusText(statusText)
    res.setHeader('foo', 'bar')
    res.send('hello')
    assert.strictEqual(res.statusCode, statusCode)
    assert.strictEqual(res.statusText, statusText)
    assert.strictEqual(res.header['foo'], 'bar')
    assert.strictEqual(resStr,
      'HTTP/1.1 404 not found' + '\r\n' +
      'foo: bar' + '\r\n' +
      'Content-Length: 5' + '\r\n' +
      '\r\n' +
      'hello'
    )
  })

  it('参数错误的时候会抛错', () => {
    try {
      req = new Response()
    } catch (e) {
      assert.strictEqual(e.message, Response.CONSTRUCT_ERROR)
    }
  })
})
