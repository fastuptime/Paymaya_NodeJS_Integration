const PayMaya = require('./index');

// Initialize the PayMaya client with sandbox credentials
const paymaya = new PayMaya({
  publicKey: 'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah',
  secretKey: 'sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl',
  environment: 'SANDBOX'
});

// Test functions
async function testCheckout() {
  try {
    console.log('=== CHECKOUT TEST ===');
    
    const checkoutData = {
      totalAmount: {
        value: 100.00,
        currency: 'PHP',
      },
      buyer: {
        firstName: 'John',
        lastName: 'Doe',
        contact: {
          phone: '+639123456789',
          email: 'john.doe@example.com'
        },
        shippingAddress: {
          line1: '123 Test Street',
          line2: 'Test Barangay',
          city: 'Manila',
          state: 'Metro Manila',
          zipCode: '1234',
          countryCode: 'PH'
        },
        billingAddress: {
          line1: '123 Test Street',
          line2: 'Test Barangay',
          city: 'Manila',
          state: 'Metro Manila',
          zipCode: '1234',
          countryCode: 'PH'
        }
      },
      items: [
        {
          name: 'Test Product',
          quantity: 1,
          code: 'TST01',
          description: 'Test product description',
          amount: {
            value: 100.00,
            details: {
              discount: 0,
              serviceCharge: 0,
              shippingFee: 0,
              tax: 0,
              subtotal: 100.00
            }
          },
          totalAmount: {
            value: 100.00,
            details: {
              discount: 0,
              serviceCharge: 0,
              shippingFee: 0,
              tax: 0,
              subtotal: 100.00
            }
          }
        }
      ],
      redirectUrl: {
        success: 'https://www.example.com/success',
        failure: 'https://www.example.com/failure',
        cancel: 'https://www.example.com/cancel'
      },
      requestReferenceNumber: 'REF-' + Date.now()
    };

    const checkoutResult = await paymaya.checkout.create(checkoutData);
    console.log('Checkout Created:', checkoutResult);
    console.log('Payment Page URL:', checkoutResult.redirectUrl);
    
    return checkoutResult;
  } catch (error) {
    console.error('Checkout Error:', error.message);
  }
}

async function testInvoice() {
  try {
    console.log('\n=== INVOICE TEST ===');
    
    // Invoice data updated as required by API
    const invoiceData = {
      totalAmount: {
        value: 150.00,
        currency: 'PHP',
      },
      buyer: {
        firstName: 'John',
        lastName: 'Doe',
        contact: {
          phone: '+639123456789',
          email: 'john.doe@example.com'
        }
      },
      title: 'Test Invoice',
      description: 'Test invoice description',
      redirectUrl: {
        success: 'https://www.example.com/success',
        failure: 'https://www.example.com/failure'
      },
      // Fields required by the API
      invoiceNumber: `INV${Date.now().toString().substring(0, 10)}`,
      type: 'SINGLE', // SINGLE or RECURRING
      requestReferenceNumber: `REF${Date.now().toString().substring(0, 10)}`, // Alphanumeric only
      expiryDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString()
    };

    const invoiceResult = await paymaya.invoice.create(invoiceData);
    console.log('Invoice Created:', invoiceResult);
    
    return invoiceResult;
  } catch (error) {
    console.error('Invoice Error:', error.message);
  }
}

async function testVault() {
  try {
    console.log('\n=== VAULT TEST ===');
    
    // Create customer
    const customerData = {
      firstName: 'John',
      lastName: 'Doe',
      contact: {
        phone: '+639123456789',
        email: 'john.doe@example.com'
      },
      billingAddress: {
        line1: '123 Test Street',
        line2: 'Test Barangay',
        city: 'Manila',
        state: 'Metro Manila',
        zipCode: '1234',
        countryCode: 'PH'
      }
    };

    const customerResult = await paymaya.vault.createCustomer(customerData);
    console.log('Customer Created:', customerResult);
    
    if (!customerResult.id) {
      throw new Error('Customer ID not found');
    }
    
    // Create card (example only)
    const cardData = {
      paymentTokenId: 'fake-payment-token', // You need to get a real payment token
      isDefault: true,
      redirectUrl: {
        success: 'https://www.example.com/success',
        failure: 'https://www.example.com/failure',
        cancel: 'https://www.example.com/cancel'
      }
    };
    
    // Note: This part won't work without a real payment token
    console.log('Note: Card creation will not work without a real payment token');
    
    return customerResult;
  } catch (error) {
    console.error('Vault Error:', error.message);
  }
}

async function testWebhooks() {
  try {
    console.log('\n=== WEBHOOK TEST ===');
    
    // First check existing webhooks
    let existingWebhooks;
    try {
      existingWebhooks = await paymaya.webhooks.list();
      console.log('Existing Webhooks:', existingWebhooks);
    } catch (error) {
      console.log('Could not retrieve webhook list:', error.message);
    }
    
    // Webhook definitions
    const webhookEvents = [
      { name: 'CHECKOUT_SUCCESS', callbackUrl: 'https://www.example.com/webhook/success' },
      { name: 'CHECKOUT_FAILURE', callbackUrl: 'https://www.example.com/webhook/failure' },
      { name: 'CHECKOUT_DROPOUT', callbackUrl: 'https://www.example.com/webhook/dropout' }
    ];
    
    // Register each webhook
    for (const webhook of webhookEvents) {
      try {
        // If webhook with this name exists, update it
        const existingWebhook = existingWebhooks?.find(w => w.name === webhook.name);
        
        if (existingWebhook) {
          console.log(`'${webhook.name}' webhook already exists, updating...`);
          const updateResult = await paymaya.webhooks.update(existingWebhook.id, webhook);
          console.log(`Webhook '${webhook.name}' updated:`, updateResult);
        } else {
          console.log(`Creating '${webhook.name}' webhook...`);
          const registerResult = await paymaya.webhooks.register(webhook);
          console.log(`Webhook '${webhook.name}' registered:`, registerResult);
        }
      } catch (error) {
        console.error(`Error during '${webhook.name}' webhook operation:`, error.message);
      }
    }
    
    // Get updated webhook list
    const updatedWebhooks = await paymaya.webhooks.list();
    console.log('Current Webhook List:', updatedWebhooks);
    
    return updatedWebhooks;
  } catch (error) {
    console.error('Webhook Error:', error.message);
  }
}

// Run test scenarios
async function runTests() {
  // Set up webhooks first (better to do this before other tests)
  console.log('Configuring webhook settings...');
  await testWebhooks();
  
  // Run other tests
  await testCheckout();
  await testInvoice();
  await testVault();
  
  console.log('\n=== TEST COMPLETED ===');
  console.log('Open the checkout page and pay with one of these test cards:');
  console.log('MASTERCARD: 5123456789012346, 12/2025, CVV: 111');
  console.log('MASTERCARD (3DS): 5453010000064154, 12/2025, CVV: 111, 3DS Password: secbarry1');
  console.log('VISA: 4123450131001381, 12/2025, CVV: 123, 3DS Password: mctest1');
}

// Run the tests
runTests();
