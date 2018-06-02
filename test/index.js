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
const spaceKey = 'spaceKey'
const title = 'title'
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
      return api.search(cql, expand).then((response) => {
        expect(response).to.be.deep.equals(searchResponse)
      })
    })
    it('Should handle expand as array', function () {
      nock(endpoint, {
          authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        })
        .get('/rest/api/content/search')
        .query({
          cql,
          expand:'a,b',
          limit
        })
        .reply(200, searchResponse);
      return api.search(cql, ['a','b']).then((response) => {
        expect(response).to.be.deep.equals(searchResponse)
      })
    })
  })
  describe('request', function () {
    const path = '/path'
    const params = {
      a:'b',
      c:'d'
    }
    const requestResponse = {
      data: 'data'
    }
    it('Should pass parameters to back end', function () {
      nock(endpoint, {
          authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        })
        .get(path)
        .query(params)
        .reply(200, requestResponse);
      return api.request(path,params).then((response) => {
        expect(response).to.be.deep.equals(requestResponse)
      })
    })
  })

  describe('get', function () {
    const getResponse = {
      results: ['data']
    }
    it('Should pass parameters to back end', function () {
      nock(endpoint, {
          authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        })
        .get('/rest/api/content')
        .query({
          spaceKey,
          expand,
          title
        })
        .reply(200, getResponse);
      return api.get(spaceKey,title, expand).then((response) => {
        expect(response).to.be.deep.equals(getResponse.results[0])
      })
    })
    it('Should handle expand as array', function () {
      nock(endpoint, {
          authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        })
        .get('/rest/api/content')
        .query({
          spaceKey,
          expand:'a,b',
          title
        })
        .reply(200, getResponse);
      return api.get(spaceKey,title, ['a','b']).then((response) => {
        expect(response).to.be.deep.equals(getResponse.results[0])
      })
    })
  })
})
