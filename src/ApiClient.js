
const _ = require('lodash');
const request = require('request-promise');


const DEFAULT_CONFIG = {

  // Required parameters.
  accountName: '',
  key: '',

  // Optional configuration.
  endpointPlaceholder: 'https://{accountName}.api-us1.com/admin/api.php',
  endpointUrl: '',
  requestOptions: {},
  debug: false

};


class ApiClient {

  /**
   * Creates new instance of ActiveCampaign API client.
   *
   * @param {object} config
   */
  constructor (config) {

    this.config = _.extend({}, DEFAULT_CONFIG, config);

    // Determining endpoint URL.
    if (!this.config.endpointUrl) {
      this.config.endpointUrl = this.config.endpointPlaceholder
        .replace(/\{accountName\}/g, this.config.accountName)
      ;
    }

  }

  /**
   * Calls API endpoint with specified request data.
   *
   * @param {string} action
   * @param {object} query
   * @param {string} [method]
   * @param {object} [body]
   * @param {object} [options]
   *
   * @returns {Promise<object>}
   */
  call (action, query, method, body, options) {
    options = options || {};
    query = _.extend({}, {
      api_action: action,
      api_key: this.config.key,
      api_output: 'json'
    }, query || {});
    let requestOptions = {
      url: this.config.endpointUrl,
      qs: query
    };
    if (method) {
      requestOptions.method = method.toUpperCase();
    }
    if (body) {
      requestOptions.form = body;
    }
    requestOptions = _.extend({},
      this.config.requestOptions,
      requestOptions,
      options.requestOptions || {}
    );
    if (this.config.debug) {
      console.log('Making request to ActiveCampaign', __debugValues(requestOptions));
    }
    return request(requestOptions)
      .then(response => {
        let result = JSON.parse(response);
        if (this.config.debug) {
          console.log('Got response from ActiveCampaign', __debugValues(result));
        }
        return result;
      })
    ;
  }

}

module.exports = ApiClient;


function __debugValues () {
  let value = arguments;
  if (1 == arguments.length) {
    value = arguments[0];
  }
  return JSON.stringify(value, null, 4);
}
