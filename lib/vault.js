/**
 * PayMaya Vault operations (Card Storage)
 */
class Vault {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new customer
   * @param {Object} customerData Customer information
   * @returns {Promise<Object>}
   */
  async createCustomer(customerData) {
    return this.client.secretRequest('POST', '/payments/v1/customers', customerData);
  }

  /**
   * Updates customer information
   * @param {String} customerId Customer ID
   * @param {Object} customerData Updated customer information
   * @returns {Promise<Object>}
   */
  async updateCustomer(customerId, customerData) {
    return this.client.secretRequest('PUT', `/payments/v1/customers/${customerId}`, customerData);
  }

  /**
   * Gets customer information
   * @param {String} customerId Customer ID
   * @returns {Promise<Object>}
   */
  async getCustomer(customerId) {
    return this.client.secretRequest('GET', `/payments/v1/customers/${customerId}`);
  }

  /**
   * Deletes a customer record
   * @param {String} customerId Customer ID
   * @returns {Promise<Object>}
   */
  async deleteCustomer(customerId) {
    return this.client.secretRequest('DELETE', `/payments/v1/customers/${customerId}`);
  }

  /**
   * Adds a new card
   * @param {String} customerId Customer ID
   * @param {Object} cardData Card information
   * @returns {Promise<Object>}
   */
  async createCard(customerId, cardData) {
    return this.client.secretRequest('POST', `/payments/v1/customers/${customerId}/cards`, cardData);
  }

  /**
   * Gets saved card details
   * @param {String} customerId Customer ID
   * @param {String} cardId Card ID
   * @returns {Promise<Object>}
   */
  async getCard(customerId, cardId) {
    return this.client.secretRequest('GET', `/payments/v1/customers/${customerId}/cards/${cardId}`);
  }

  /**
   * Deletes a saved card
   * @param {String} customerId Customer ID
   * @param {String} cardId Card ID
   * @returns {Promise<Object>}
   */
  async deleteCard(customerId, cardId) {
    return this.client.secretRequest('DELETE', `/payments/v1/customers/${customerId}/cards/${cardId}`);
  }

  /**
   * Makes a payment with a saved card
   * @param {String} customerId Customer ID
   * @param {String} cardId Card ID
   * @param {Object} paymentData Payment information
   * @returns {Promise<Object>}
   */
  async createPayment(customerId, cardId, paymentData) {
    return this.client.secretRequest(
      'POST',
      `/payments/v1/customers/${customerId}/cards/${cardId}/payments`,
      paymentData
    );
  }
}

module.exports = Vault;
