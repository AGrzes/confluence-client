var rest = require('restling');
var _ = require('lodash');

module.exports = function(config) {
    var username = config.username;
    var password = config.password;
    var endpoint = config.endpoint;

    var api = {
        search : function(cql, expand) {
            return rest.get(endpoint + '/rest/api/content/search', {
                query : {
                    cql : cql,
                    expand : _.isArray(expand) ? expand.join(',') : expand
                },
                username : username,
                password : password
            }).then(_.property('data'))
        },
        request : function(path, params) {
            return rest.get(endpoint + path, {
                query : params,
                username : username,
                password : password
            }).then(_.property('response'))
        },
        get : function(spaceKey,title, expand){
            return rest.get(endpoint + '/rest/api/content', {
                query : {
                    spaceKey : spaceKey,
                    title : title,
                    expand : _.isArray(expand) ? expand.join(',') : expand
                },
                username : username,
                password : password
            }).then(_.flow(_.property('data'),_.property('results'),_.first))
        },
        properties : function(spaceKey, cql, properties) {
            return rest.get(endpoint + '/rest/masterdetail/1.0/detailssummary/lines', {
                query : {
                    spaceKey : spaceKey,
                    cql : cql,
                    headings : _.isArray(properties) ? expand.join(',') : properties,
                    pageSize: 1000
                },
                username : username,
                password : password
            }).then(function(response) {
                var headings = response.data.renderedHeadings;
                return response.data.detailLines.map(function(line) {
                    return {
                        id : line.id,
                        title : line.title,
                        properties : _.zipObject(headings, line.details)
                    };
                });
            })
        }
    };

    return api;
}
