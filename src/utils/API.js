import axios from 'axios';
import { resourceQueryTypes } from '../config/config';

export function SDataService(sdataUri, username, password) {

  let _config = {};
  const service = {

    setAuthenticationParameters: function (newUsername, newPassword) {
      let basicAuth = 'Basic ' + btoa(newUsername + ':' + newPassword);
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
      let url = sdataUri + resourceKind; 

      if(resourceKind === resourceQueryTypes.picklist){
        url += '(name eq \'' + id + '\')/items?format=json';
        url = url.replace('dynamic','system'); 
      }else{
        url += '(\'' + id + '\')?format=json';
      }

      if(queryArgs) {
        if (typeof (queryArgs) == 'function' && !callback) {
          callback = queryArgs;
        } else {
          for (let k in queryArgs) {
            if (queryArgs.hasOwnProperty(k))
              url += '&' + k + '=' + encodeURIComponent(queryArgs[k]);
          }
        }
      }
      return handleSdataResponse(axios.get(url, _config), 200, callback)
    },

    read: function (resourceKind, where, queryArgs, callback) {
      let url = sdataUri + resourceKind + '?format=json'
      if (where && !(queryArgs && 'where' in queryArgs)) {
        //encode the URI for sData, space-delimited where clause
        url += '&where=' + encodeURIComponent(where)
      }
      if (queryArgs) {
        if (typeof (queryArgs) == 'function' && !callback) {
          callback = queryArgs;
        } else {
          for (let k in queryArgs) {
            if (queryArgs.hasOwnProperty(k))
              url += '&' + k + '=' + encodeURIComponent(queryArgs[k]);
          }
        }
      }
      return handleSdataResponse(axios.get(url, _config), 200, callback)
    },

    update: function (resourceKind, data, callback) {
      // summary:
      //  Update designated resource.  The id ($key) must be provided as part of the data.
      var url = sdataUri + resourceKind + '("' + data.$key + '")?format=json';
      return handleSdataResponse(axios.put(url, data, _config), 200, callback);
    },
  };

  //authenticate if user invokes sData service function with credentials
  if (username)
    service.setAuthenticationParameters(username, password);

  return service;

  function handleSdataResponse(requestPromise, expectedStatusCode, callback) {
    let p = requestPromise.then((response) => {
      let body = response.data

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