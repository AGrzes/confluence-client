const expect = require('chai').expect
const nock = require('nock')
const confluenceClient = require('../index')
const endpoint = "http://example.com"
const username = 'username'
const password = 'password'
const api = confluenceClient({
  endpoint,
  username,
  password
})
const cql = 'cql'
const expand = 'expand'
const limit = 100
describe('confluence-client', function () {

  describe('search', function () {
    const searchResponse = {
      data: 'data'
    }
    it('Should pass parameters to back end', function () {
      nock(endpoint, {
          authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        })
        .get('/rest/api/content/search')
        .query({
          cql,
          expand,
          limit
        })
        .reply(200, searchResponse);
      return api.search(cql, 'expand').then((response) => {
        expect(response).to.be.deep.equals(searchResponse)
      })
    })
  })
})
