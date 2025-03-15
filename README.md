# PayMaya Integration Module 💳

This module provides a client for integrating the PayMaya payment system into Node.js applications.

[🇹🇷 Türkçe versiyonu için tıklayın](#paymaya-entegrasyon-modülü-)

## Installation 📦

```bash
npm install paymaya-integration
```

## Usage 🚀

### Initialization

```javascript
const PayMaya = require('paymaya-integration');

const paymaya = new PayMaya({
  publicKey: 'YOUR_PUBLIC_KEY',
  secretKey: 'YOUR_SECRET_KEY',
  environment: 'SANDBOX' // or 'PRODUCTION'
});
```

### Checkout Example

```javascript
const checkoutData = {
  totalAmount: {
    value: 100,
    currency: 'PHP',
  },
  buyer: {
    firstName: 'John',
    lastName: 'Doe',
    contact: {
      phone: '09123456789',
      email: 'john.doe@example.com'
    },
    shippingAddress: {
      line1: '123 Street',
      line2: 'Sample Barangay',
      city: 'Manila',
      state: 'Metro Manila',
      zipCode: '1234',
      countryCode: 'PH'
    },
    billingAddress: {
      line1: '123 Street',
      line2: 'Sample Barangay',
      city: 'Manila',
      state: 'Metro Manila',
      zipCode: '1234',
      countryCode: 'PH'
    }
  },
  items: [
    {
      name: 'Product 1',
      quantity: 1,
      code: 'PROD1',
      description: 'Product description',
      amount: {
        value: 100,
        details: {
          discount: 0,
          serviceCharge: 0,
          shippingFee: 0,
          tax: 0,
          subtotal: 100
        }
      },
      totalAmount: {
        value: 100,
        details: {
          discount: 0,
          serviceCharge: 0,
          shippingFee: 0,
          tax: 0,
          subtotal: 100
        }
      }
    }
  ],
  redirectUrl: {
    success: 'https://example.com/success',
    failure: 'https://example.com/failure',
    cancel: 'https://example.com/cancel'
  },
  requestReferenceNumber: 'REF123456789'
};

// Create payment transaction
paymaya.checkout.create(checkoutData)
  .then(response => {
    console.log('Checkout URL:', response.redirectUrl);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

### Webhook Processing Example

```javascript
// Express Application Example
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook/payment', (req, res) => {
  const isValid = paymaya.webhooks.verifyWebhook(req, 'YOUR_SECRET_KEY');
  
  if (isValid) {
    const event = req.body;
    
    // Process webhook events
    switch (event.type) {
      case 'CHECKOUT_SUCCESS':
        // Successful payment process
        break;
      case 'CHECKOUT_FAILURE':
        // Failed payment process
        break;
      default:
        console.log('Unknown event:', event.type);
    }
    
    res.status(200).send('OK');
  } else {
    res.status(400).send('Invalid webhook');
  }
});
```

## API Reference 📚

### Checkout

- `paymaya.checkout.create(checkoutData)`: Creates a new payment transaction
- `paymaya.checkout.retrieve(id)`: Gets the details of a payment transaction
- `paymaya.checkout.setWebhooks(webhooks)`: Sets webhook URLs
- `paymaya.checkout.getWebhooks()`: Gets webhook URLs

### Invoice

- `paymaya.invoice.create(invoiceData)`: Creates a new invoice
- `paymaya.invoice.retrieve(id)`: Gets the details of an invoice
- `paymaya.invoice.cancel(id, reason)`: Cancels an invoice

### Vault (Card Storage)

- `paymaya.vault.createCustomer(customerData)`: Creates a new customer
- `paymaya.vault.updateCustomer(customerId, customerData)`: Updates customer information
- `paymaya.vault.getCustomer(customerId)`: Gets customer information
- `paymaya.vault.deleteCustomer(customerId)`: Deletes a customer record
- `paymaya.vault.createCard(customerId, cardData)`: Adds a new card
- `paymaya.vault.getCard(customerId, cardId)`: Gets a saved card
- `paymaya.vault.deleteCard(customerId, cardId)`: Deletes a saved card
- `paymaya.vault.createPayment(customerId, cardId, paymentData)`: Makes a payment with a saved card

### Webhooks

- `paymaya.webhooks.verifyWebhook(request, secretKey)`: Verifies a webhook
- `paymaya.webhooks.register(webhooks)`: Registers webhook URLs
- `paymaya.webhooks.list()`: Lists registered webhook URLs
- `paymaya.webhooks.update(id, webhookData)`: Updates webhook URLs
- `paymaya.webhooks.delete(id)`: Deletes a webhook registration

## Sandbox Test Information ⚙️

### Sandbox API Keys

| Sandbox Merchant | Public API Key | Secret API Key |
|------------------|---------------|----------------|
| Sandbox Party 1 | pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah | sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl |
| Sandbox Party 2 | pk-eo4sL393CWU5KmveJUaW8V730TTei2zY8zE4dHJDxkF | sk-KfmfLJXFdV5t1inYN8lIOwSrueC1G27SCAklBqYCdrU |
| Sandbox Party 3 | pk-lNAUk1jk7VPnf7koOT1uoGJoZJjmAxrbjpj6urB8EIA | sk-fzukI3GXrzNIUyvXY3n16cji8VTJITfzylz5o5QzZMC |

### Test Cards

| Card Type | Number | Expiry Month | Expiry Year | CVV | 3D Secure |
|-----------|--------|-----------------|------------------|-----|-----------|
| MASTERCARD | 5123456789012346 | 12 | 2025 | 111 | Not Active |
| MASTERCARD | 5453010000064154 | 12 | 2025 | 111 | secbarry1 |
| VISA | 4123450131001381 | 12 | 2025 | 123 | mctest1 |

### Maya E-wallet Test Account

- Username: 09193890579
- Password: Password@1
- OTP: 123456

## Author 👨‍💻

- [FastUptime](https://github.com/fastuptime)
- GitHub Repository: [Paymaya_NodeJS_Integration](https://github.com/fastuptime/Paymaya_NodeJS_Integration)

---

# PayMaya Entegrasyon Modülü 💳

Bu modül, PayMaya ödeme sistemini Node.js uygulamalarına entegre etmek için bir istemci sağlar.

[🇬🇧 Click for English version](#paymaya-integration-module-)

## Kurulum 📦

```bash
npm install paymaya-integration
```

## Kullanım 🚀

### Başlatma

```javascript
const PayMaya = require('paymaya-integration');

const paymaya = new PayMaya({
  publicKey: 'YOUR_PUBLIC_KEY',
  secretKey: 'YOUR_SECRET_KEY',
  environment: 'SANDBOX' // veya 'PRODUCTION'
});
```

### Checkout İşlemi Örneği

```javascript
const checkoutData = {
  totalAmount: {
    value: 100,
    currency: 'PHP',
  },
  buyer: {
    firstName: 'John',
    lastName: 'Doe',
    contact: {
      phone: '09123456789',
      email: 'john.doe@example.com'
    },
    shippingAddress: {
      line1: '123 Street',
      line2: 'Sample Barangay',
      city: 'Manila',
      state: 'Metro Manila',
      zipCode: '1234',
      countryCode: 'PH'
    },
    billingAddress: {
      line1: '123 Street',
      line2: 'Sample Barangay',
      city: 'Manila',
      state: 'Metro Manila',
      zipCode: '1234',
      countryCode: 'PH'
    }
  },
  items: [
    {
      name: 'Product 1',
      quantity: 1,
      code: 'PROD1',
      description: 'Product description',
      amount: {
        value: 100,
        details: {
          discount: 0,
          serviceCharge: 0,
          shippingFee: 0,
          tax: 0,
          subtotal: 100
        }
      },
      totalAmount: {
        value: 100,
        details: {
          discount: 0,
          serviceCharge: 0,
          shippingFee: 0,
          tax: 0,
          subtotal: 100
        }
      }
    }
  ],
  redirectUrl: {
    success: 'https://example.com/success',
    failure: 'https://example.com/failure',
    cancel: 'https://example.com/cancel'
  },
  requestReferenceNumber: 'REF123456789'
};

// Ödeme işlemi oluştur
paymaya.checkout.create(checkoutData)
  .then(response => {
    console.log('Checkout URL:', response.redirectUrl);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

### Webhook İşleme Örneği

```javascript
// Express Uygulaması Örneği
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook/payment', (req, res) => {
  const isValid = paymaya.webhooks.verifyWebhook(req, 'YOUR_SECRET_KEY');
  
  if (isValid) {
    const event = req.body;
    
    // Webhook olaylarını işle
    switch (event.type) {
      case 'CHECKOUT_SUCCESS':
        // Başarılı ödeme işlemi
        break;
      case 'CHECKOUT_FAILURE':
        // Başarısız ödeme işlemi
        break;
      default:
        console.log('Bilinmeyen olay:', event.type);
    }
    
    res.status(200).send('OK');
  } else {
    res.status(400).send('Invalid webhook');
  }
});
```

## API Referansı 📚

### Checkout

- `paymaya.checkout.create(checkoutData)`: Yeni bir ödeme işlemi oluşturur
- `paymaya.checkout.retrieve(id)`: Bir ödeme işleminin detayını alır
- `paymaya.checkout.setWebhooks(webhooks)`: Webhook URL'lerini ayarlar
- `paymaya.checkout.getWebhooks()`: Webhook URL'lerini alır

### Invoice

- `paymaya.invoice.create(invoiceData)`: Yeni bir fatura oluşturur
- `paymaya.invoice.retrieve(id)`: Bir faturanın detaylarını alır
- `paymaya.invoice.cancel(id, reason)`: Bir faturayı iptal eder

### Vault (Kart Saklama)

- `paymaya.vault.createCustomer(customerData)`: Yeni bir müşteri oluşturur
- `paymaya.vault.updateCustomer(customerId, customerData)`: Müşteri bilgilerini günceller
- `paymaya.vault.getCustomer(customerId)`: Müşteri bilgilerini alır
- `paymaya.vault.deleteCustomer(customerId)`: Müşteri kaydını siler
- `paymaya.vault.createCard(customerId, cardData)`: Yeni bir kart ekler
- `paymaya.vault.getCard(customerId, cardId)`: Kaydedilmiş kartı alır
- `paymaya.vault.deleteCard(customerId, cardId)`: Kaydedilmiş kartı siler
- `paymaya.vault.createPayment(customerId, cardId, paymentData)`: Kaydedilmiş kart ile ödeme yapar

### Webhooks

- `paymaya.webhooks.verifyWebhook(request, secretKey)`: Webhook doğrulaması yapar
- `paymaya.webhooks.register(webhooks)`: Webhook URL'lerini kaydeder
- `paymaya.webhooks.list()`: Kayıtlı webhook URL'lerini listeler
- `paymaya.webhooks.update(id, webhookData)`: Webhook URL'lerini günceller
- `paymaya.webhooks.delete(id)`: Webhook kaydını siler

## Sandbox Test Bilgileri ⚙️

### Sandbox API Keys

| Sandbox Merchant | Public API Key | Secret API Key |
|------------------|---------------|----------------|
| Sandbox Party 1 | pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah | sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl |
| Sandbox Party 2 | pk-eo4sL393CWU5KmveJUaW8V730TTei2zY8zE4dHJDxkF | sk-KfmfLJXFdV5t1inYN8lIOwSrueC1G27SCAklBqYCdrU |
| Sandbox Party 3 | pk-lNAUk1jk7VPnf7koOT1uoGJoZJjmAxrbjpj6urB8EIA | sk-fzukI3GXrzNIUyvXY3n16cji8VTJITfzylz5o5QzZMC |

### Test Kartları

| Kart Tipi | Numara | Son Kullanma Ay | Son Kullanma Yıl | CVV | 3D Secure |
|-----------|--------|-----------------|------------------|-----|-----------|
| MASTERCARD | 5123456789012346 | 12 | 2025 | 111 | Aktif Değil |
| MASTERCARD | 5453010000064154 | 12 | 2025 | 111 | secbarry1 |
| VISA | 4123450131001381 | 12 | 2025 | 123 | mctest1 |

### Maya E-wallet Test Hesabı

- Kullanıcı Adı: 09193890579
- Şifre: Password@1
- OTP: 123456

## Yapımcı 👨‍💻

- [FastUptime](https://github.com/fastuptime)
- GitHub Repository: [Paymaya_NodeJS_Integration](https://github.com/fastuptime/Paymaya_NodeJS_Integration)