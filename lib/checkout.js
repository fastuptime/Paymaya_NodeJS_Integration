/**
 * PayMaya Checkout operations
 */
class Checkout {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new payment transaction
   * @param {Object} checkoutData Payment data
   * @returns {Promise<Object>}
   */
  async create(checkoutData) {
    return this.client.publicRequest('POST', '/checkout/v1/checkouts', checkoutData);
  }

  /**
   * Gets details of a payment transaction
   * @param {String} id Payment transaction ID
   * @returns {Promise<Object>}
   */
  async retrieve(id) {
    return this.client.secretRequest('GET', `/checkout/v1/checkouts/${id}`);
  }

  /**
   * Sets webhook URLs
   * @param {Object} webhooks
   * @param {String} webhooks.success Webhook URL for successful payments
   * @param {String} webhooks.failure Webhook URL for failed payments
   * @param {String} webhooks.cancel Webhook URL for cancelled payments
   * @returns {Promise<Object>}
   */
  async setWebhooks(webhooks) {
    return this.client.secretRequest('POST', '/checkout/v1/webhooks', webhooks);
  }

  /**
   * Gets webhook URLs
   * @returns {Promise<Object>}
   */
  async getWebhooks() {
    return this.client.secretRequest('GET', '/checkout/v1/webhooks');
  }
}

module.exports = Checkout;
