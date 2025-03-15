const PayMaya = require('./index');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// PayMaya istemcisi
const paymaya = new PayMaya({
  publicKey: 'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah',
  secretKey: 'sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl',
  environment: 'SANDBOX'
});

// Menü
function showMenu() {
  console.log('\n==== PAYMAYA TEST MENÜSÜ ====');
  console.log('1. Ödeme Sayfası Oluştur');
  console.log('2. Fatura Oluştur');
  console.log('3. Webhook Ayarla');
  console.log('4. Test Bilgilerini Göster');
  console.log('0. Çıkış');
  
  rl.question('\nLütfen bir seçenek girin (0-4): ', async (answer) => {
    switch(answer) {
      case '1':
        await createCheckout();
        break;
      case '2':
        await createInvoice();
        break;
      case '3':
        await setupWebhooks();
        break;
      case '4':
        showTestInfo();
        break;
      case '0':
        console.log('Programdan çıkılıyor...');
        rl.close();
        return;
      default:
        console.log('Geçersiz seçenek!');
    }
    
    // Ana menüye dön
    setTimeout(showMenu, 1000);
  });
}

// Ödeme Sayfası Oluştur
async function createCheckout() {
  console.log('\n=== ÖDEME SAYFASI OLUŞTURULUYOR ===');
  
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
        city: 'Manila',
        state: 'Metro Manila',
        zipCode: '1234',
        countryCode: 'PH'
      },
      billingAddress: {
        line1: '123 Test Street',
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
        description: 'Test ürün',
        amount: {
          value: 100.00
        },
        totalAmount: {
          value: 100.00
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

  try {
    const result = await paymaya.checkout.create(checkoutData);
    console.log('Ödeme sayfası oluşturuldu!');
    console.log('Ödeme URL\'si:', result.redirectUrl);
    console.log('Checkout ID:', result.checkoutId);
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

// Fatura Oluştur
async function createInvoice() {
  console.log('\n=== FATURA OLUŞTURULUYOR ===');
  
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
    title: 'Test Faturası',
    description: 'Test fatura açıklaması',
    redirectUrl: {
      success: 'https://www.example.com/success',
      failure: 'https://www.example.com/failure'
    },
    requestReferenceNumber: 'INV-' + Date.now(),
    expiryDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString() // 7 gün sonra
  };

  try {
    const result = await paymaya.invoice.create(invoiceData);
    console.log('Fatura oluşturuldu!');
    console.log('Fatura URL\'si:', result.redirectUrl);
    console.log('Fatura ID:', result.id);
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

// Webhook Ayarla
async function setupWebhooks() {
  console.log('\n=== WEBHOOK AYARLANIYOR ===');
  
  try {
    // Mevcut webhook'ları listele
    const webhooks = await paymaya.webhooks.list();
    console.log('Mevcut Webhook\'lar:', webhooks);
    
    // Yeni webhook ekle
    const webhook = {
      name: 'CHECKOUT_SUCCESS', 
      callbackUrl: 'https://www.example.com/webhook/success'
    };
    
    const result = await paymaya.webhooks.register(webhook);
    console.log('Webhook eklendi:', result);
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

// Test bilgilerini göster
function showTestInfo() {
  console.log('\n=== TEST BİLGİLERİ ===');
  console.log('Sandbox API Keys:');
  console.log('Public Key: pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah');
  console.log('Secret Key: sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl');
  
  console.log('\nTest Kartları:');
  console.log('MASTERCARD: 5123456789012346, 12/2025, CVV: 111');
  console.log('MASTERCARD (3DS): 5453010000064154, 12/2025, CVV: 111, 3DS Şifre: secbarry1');
  console.log('VISA: 4123450131001381, 12/2025, CVV: 123, 3DS Şifre: mctest1');
  
  console.log('\nMaya E-wallet Test Hesabı:');
  console.log('Kullanıcı Adı: 09193890579');
  console.log('Şifre: Password@1');
  console.log('OTP: 123456');
}

// Programı başlat
console.log('PayMaya Sandbox Test Programı');
showMenu();
