const crypto = require('crypto');
const { WEBHOOK_DOMAINS } = require('./constants');

/**
 * PayMaya Webhook Operations
 */
class Webhooks {
  constructor(client) {
    this.client = client;
  }

  /**
   * Verifies webhook authenticity
   * @param {Object} request Express request object
   * @param {String} secretKey PayMaya secret key
   * @returns {Boolean} Verification result
   */
  verifyWebhook(request, secretKey) {
    // IP verification
    const clientIp = request.ip || 
      request.connection.remoteAddress || 
      request.headers['x-forwarded-for'];
    
    const validIPs = WEBHOOK_DOMAINS[this.client.environment];
    const isValidIP = validIPs.some(ip => clientIp.includes(ip));
    
    if (!isValidIP) {
      return false;
    }

    // If X-Signature header is present, verify signature
    const signature = request.headers['x-signature'];
    if (signature) {
      const payload = JSON.stringify(request.body);
      const expectedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(payload)
        .digest('hex');
      
      return signature === expectedSignature;
    }

    return false;
  }

  /**
   * Registers webhook URLs
   * @param {Object} webhooks
   * @param {String} webhooks.name Webhook event name
   * @param {String} webhooks.callbackUrl Callback URL
   * @returns {Promise<Object>}
   */
  async register(webhooks) {
    return this.client.secretRequest('POST', '/checkout/v1/webhooks', webhooks);
  }

  /**
   * Lists registered webhook URLs
   * @returns {Promise<Object>}
   */
  async list() {
    return this.client.secretRequest('GET', '/checkout/v1/webhooks');
  }

  /**
   * Updates webhook URLs
   * @param {String} id Webhook ID
   * @param {Object} webhookData Webhook information
   * @returns {Promise<Object>}
   */
  async update(id, webhookData) {
    return this.client.secretRequest('PUT', `/checkout/v1/webhooks/${id}`, webhookData);
  }

  /**
   * Deletes a webhook registration
   * @param {String} id Webhook ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return this.client.secretRequest('DELETE', `/checkout/v1/webhooks/${id}`);
  }
}

module.exports = Webhooks;
