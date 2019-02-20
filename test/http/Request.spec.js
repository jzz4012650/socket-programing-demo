const assert = require('assert')
const Request = require('../../src/http/Request')

describe('Request', () => {
  const rawRequest = `GET / HTTP/1.1\r\nContent-type: application/json\r\n\r\nhello`
  const wrongRequest = []

  let req
  req = new Request(rawRequest)

  it('能够正确解析原始请求', () => {
    assert.strictEqual(req.version, 'HTTP/1.1')
    assert.strictEqual(req.method, 'GET')
    assert.strictEqual(req.URI, '/')
    assert.strictEqual(req.header['Content-type'], 'application/json')
    assert.strictEqual(req.body, 'hello')
  })

  it('能够转成正确的字符串', () => {
    let str = req.toString()
    assert.strictEqual(str, rawRequest)
  })

  it('参数错误的时候会抛错', () => {
    try {
      req = new Request(wrongRequest)
    } catch (e) {
      assert.strictEqual(e.message, Request.CONSTRUCT_ERROR)
    }
  })
})
