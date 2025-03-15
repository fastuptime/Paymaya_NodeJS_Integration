const axios = require('axios');
const { API_ENDPOINTS, ENVIRONMENTS } = require('./constants');

/**
 * PayMaya API client
 */
class Client {
  /**
   * @param {Object} options
   * @param {String} options.publicKey
   * @param {String} options.secretKey
   * @param {String} options.environment
   */
  constructor(options = {}) {
    this.publicKey = options.publicKey;
    this.secretKey = options.secretKey;
    this.environment = options.environment || ENVIRONMENTS.SANDBOX;
    this.baseURL = API_ENDPOINTS[this.environment];
  }

  /**
   * Makes an API request with Public Key authentication
   * @param {String} method HTTP method
   * @param {String} path API path
   * @param {Object} data Request body
   * @param {Object} headers Additional headers
   * @returns {Promise<Object>}
   */
  async publicRequest(method, path, data = {}, headers = {}) {
    return this._request(method, path, data, {
      ...headers,
      Authorization: `Basic ${Buffer.from(this.publicKey + ':').toString('base64')}`
    });
  }

  /**
   * Makes an API request with Secret Key authentication
   * @param {String} method HTTP method
   * @param {String} path API path
   * @param {Object} data Request body
   * @param {Object} headers Additional headers
   * @returns {Promise<Object>}
   */
  async secretRequest(method, path, data = {}, headers = {}) {
    return this._request(method, path, data, {
      ...headers,
      Authorization: `Basic ${Buffer.from(this.secretKey + ':').toString('base64')}`
    });
  }

  /**
   * Makes an API request
   * @private
   */
  async _request(method, path, data = {}, headers = {}) {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${path}`,
        data: method !== 'GET' ? data : undefined,
        params: method === 'GET' ? data : undefined,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`PayMaya API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
}

module.exports = Client;
