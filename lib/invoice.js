/**
 * PayMaya Invoice operations
 */
class Invoice {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new invoice
   * @param {Object} invoiceData Invoice data
   * @returns {Promise<Object>}
   */
  async create(invoiceData) {
    return this.client.secretRequest('POST', '/invoice/v2/invoices', invoiceData);
  }

  /**
   * Gets details of an invoice
   * @param {String} id Invoice ID
   * @returns {Promise<Object>}
   */
  async retrieve(id) {
    return this.client.secretRequest('GET', `/invoice/v2/invoices/${id}`);
  }

  /**
   * Cancels an invoice
   * @param {String} id Invoice ID
   * @param {Object} reason Cancellation reason
   * @returns {Promise<Object>}
   */
  async cancel(id, reason = {}) {
    return this.client.secretRequest('POST', `/invoice/v2/invoices/${id}/cancel`, reason);
  }
}

module.exports = Invoice;
