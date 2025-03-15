const Client = require('./lib/client');
const Checkout = require('./lib/checkout');
const Invoice = require('./lib/invoice');
const Vault = require('./lib/vault');
const Webhooks = require('./lib/webhooks');
const { ENVIRONMENTS } = require('./lib/constants');

/**
 * PayMaya Main Class
 */
class Paymaya {
  /**
   * Initializes the PayMaya client
   * @param {Object} options Configuration options
   * @param {String} options.publicKey Public API Key
   * @param {String} options.secretKey Secret API Key
   * @param {String} options.environment Environment (SANDBOX or PRODUCTION)
   */
  constructor(options = {}) {
    this.publicKey = options.publicKey;
    this.secretKey = options.secretKey;
    this.environment = options.environment || ENVIRONMENTS.SANDBOX;
    
    this.client = new Client({
      publicKey: this.publicKey,
      secretKey: this.secretKey,
      environment: this.environment
    });

    this.checkout = new Checkout(this.client);
    this.invoice = new Invoice(this.client);
    this.vault = new Vault(this.client);
    this.webhooks = new Webhooks(this.client);
  }
}

module.exports = Paymaya;
