import axios from 'axios';

export function SDataService(sdataUri, username, password) {

  var _config = {};
  var service = {

    setAuthenticationParameters: function (newUsername, newPassword) {
      var basicAuth = 'Basic ' + btoa(newUsername + ':' + newPassword);
      _config = {
        headers: {
          'Authorization': basicAuth,
          'Access-Control-Allow-Origin': '*'
        }
      }
      return handleSdataResponse(axios.get(sdataUri,_config),200)
        .catch((err) => {
          alert(err);
        });
    },

    get: function(resourceKind, id, queryArgs, callback) {
      var url = sdataUri + resourceKind + '(\'' + id + '\')?format=json';
      if(queryArgs) {
        if (typeof (queryArgs) == 'function' && !callback) {
          callback = queryArgs;
        } else {
          for (var k in queryArgs) {
            if (queryArgs.hasOwnProperty(k))
              url += '&' + k + '=' + encodeURIComponent(queryArgs[k]);
          }
        }
      }
      return handleSdataResponse(axios.get(url, _config), 200, callback)
    },
  };

  //authenticate if user invokes sData service function with credentials
  if (username)
    service.setAuthenticationParameters(username, password);

  return service;

  function handleSdataResponse(requestPromise, expectedStatusCode, callback) {
    var p = requestPromise.then((response) => {
      var body = response.data

      if(response.status !== expectedStatusCode) {
        return Promise.reject({response})
      } else {
        return body
      }
    }, (err) => {
      return Promise.reject(err)
    })
    if(callback) {
      p = p.then((body) => {
        callback(null, body)
      }, (error) => {
        callback(error)
      })
    }
    return p
  }
}