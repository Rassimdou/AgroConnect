const webpush = require('web-push');
const fs = require('fs');

const vapidKeys = webpush.generateVAPIDKeys();

fs.writeFileSync('vapid-keys.json', JSON.stringify(vapidKeys, null, 2));

console.log('VAPID keys generated and saved to vapid-keys.json');
console.log('Public Key:', vapidKeys.publicKey);

