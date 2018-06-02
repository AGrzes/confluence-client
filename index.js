var axios = require('axios');
var _ = require('lodash');

module.exports = function (config) {
  var username = config.username;
  var password = config.password;
  var endpoint = config.endpoint;

  var api = {
    search: function (cql, expand) {
      return axios.get(endpoint + '/rest/api/content/search', {
        params: {
          cql: cql,
          expand: _.isArray(expand) ? expand.join(',') : expand,
          limit: 100
        },
        auth: {
          username: username,
          password: password
        }
      }).then(_.property('data'))
    },
    request: function (path, params) {
      return axios.get(endpoint + path, {
        params: params,
        auth: {
          username: username,
          password: password
        }
      }).then(_.property('data'))
    },
    get: function (spaceKey, title, expand) {
      return axios.get(endpoint + '/rest/api/content', {
        params: {
          spaceKey: spaceKey,
          title: title,
          expand: _.isArray(expand) ? expand.join(',') : expand
        },
        auth: {
          username: username,
          password: password
        }
      }).then(_.flow(_.property('data'), _.property('results'), _.first))
    },
    properties: function (spaceKey, cql, properties) {
      return axios.get(endpoint + '/rest/masterdetail/1.0/detailssummary/lines', {
        params: {
          spaceKey: spaceKey,
          cql: cql,
          headings: _.isArray(properties) ? properties.join(',') : properties,
          pageSize: 1000
        },
        auth: {
          username: username,
          password: password
        }
      }).then(function (response) {
        var headings = response.data.renderedHeadings;
        return response.data.detailLines.map(function (line) {
          return {
            id: line.id,
            title: line.title,
            properties: _.zipObject(headings, line.details)
          };
        });
      })
    }
  };

  return api;
}
