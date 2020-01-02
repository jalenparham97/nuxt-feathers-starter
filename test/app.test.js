const axios = require('axios')
const url = require('url')
const app = require('../server/app')

const hostname = app.get('host') || 'localhost'
const port = app.get('port') || 8998
const getUrl = pathname =>
  url.format({
    protocol: 'http',
    hostname,
    port,
    pathname
  })

describe('Feathers application tests (with jest)', () => {
  let server

  beforeAll(done => {
    server = app.listen(port, hostname)
    server.once('listening', () => done())
  })

  afterAll(done => {
    server.close(done)
  })

  describe('404', () => {
    it('shows a 404 JSON error without stack trace', async () => {
      expect.assertions(4)

      try {
        await axios.get(getUrl('path/to/nowhere'))
      } catch (error) {
        const { response } = error

        expect(response.status).toBe(404)
        expect(response.data.code).toBe(404)
        expect(response.data.message).toBe('Page not found')
        expect(response.data.name).toBe('NotFound')
      }
    })
  })
})
