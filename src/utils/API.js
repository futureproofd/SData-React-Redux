/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { resourceQueryTypes } from '../config/config';

export function SDataService(sdataUri, username, password) {
  /**
   *
   * @param {axios} requestPromise GET/PUT API call
   * @param {number} expectedStatusCode HTTP expected status code (i.e. 200 -OK)
   * @param {function} callback optional callback
   */
  function handleSdataResponse(requestPromise, expectedStatusCode, callback) {
    let p = requestPromise.then(
      (response) => {
        const body = response.data;

        if (response.status !== expectedStatusCode) {
          return Promise.reject({ response });
        }
        return body;
      },
      err => Promise.reject(err),
    );
    if (callback) {
      p = p.then(
        (body) => {
          callback(null, body);
        },
        (error) => {
          callback(error);
        },
      );
    }
    return p;
  }

  /**
   * service object to contain all accessible SData GET/PUT functions
   */
  let config = {};
  const service = {
    /**
     * User authentication (Basic)
     * @param {*} newUsername
     * @param {*} newPassword
     */
    setAuthenticationParameters(newUsername, newPassword) {
      const basicAuth = `Basic ${btoa(`${newUsername}:${newPassword}`)}`;
      config = {
        headers: {
          Authorization: basicAuth,
          'Access-Control-Allow-Origin': '*',
        },
      };
      return handleSdataResponse(axios.get(sdataUri, config), 200).catch(err => ({ err }));
    },

    /**
     *
     * @param {string} resourceKind the type (i.e.entity, pickList )
     * @param {string} id specific entity identifier (i.e. entityId, picklist Name)
     * @param {*} queryArgs optional
     * @param {*} callback optional
     */
    get(resourceKind, id, queryArgs, callback) {
      let url = sdataUri + resourceKind;

      if (resourceKind === resourceQueryTypes.picklist) {
        url += `(name eq '${id}')/items?format=json`;
        url = url.replace('dynamic', 'system');
      } else {
        url += `('${id}')?format=json`;
      }

      if (queryArgs) {
        if (typeof queryArgs === 'function' && !callback) {
          callback = queryArgs;
        } else {
          for (const k in queryArgs) {
            if (queryArgs.hasOwnProperty(k)) url += `&${k}=${encodeURIComponent(queryArgs[k])}`;
          }
        }
      }
      return handleSdataResponse(axios.get(url, config), 200, callback);
    },

    /**
     *
     * @param {string} resourceKind the entity type (i.e. Account/Contact/Lead)
     * @param {*} where
     * @param {*} queryArgs
     * @param {*} callback
     */
    read(resourceKind, where, queryArgs, callback) {
      let url = `${sdataUri + resourceKind}?format=json`;
      if (where && !(queryArgs && 'where' in queryArgs)) {
        // encode the URI for sData, space-delimited where clause
        url += `&where=${encodeURIComponent(where)}`;
      }
      if (queryArgs) {
        if (typeof queryArgs === 'function' && !callback) {
          callback = queryArgs;
        } else {
          for (const k in queryArgs) {
            if (queryArgs.hasOwnProperty(k)) url += `&${k}=${encodeURIComponent(queryArgs[k])}`;
          }
        }
      }
      return handleSdataResponse(axios.get(url, config), 200, callback);
    },

    /**
     * Update designated resource.  The id ($key) must be provided as part of the data.
     * @param {*} resourceKind
     * @param {*} data $key
     * @param {*} callback optional
     */
    update(resourceKind, data, callback) {
      const url = `${sdataUri + resourceKind}("${data.$key}")?format=json`;
      return handleSdataResponse(axios.put(url, data, config), 200, callback);
    },
  };

  // authenticate if user invokes sData service function with credentials
  if (username) service.setAuthenticationParameters(username, password);

  return service;
}
