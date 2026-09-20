const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';
const rawKey = process.env.ENCRYPTION_KEY || 'default-secret-key-that-is-32-bt';
// Ensure the key is exactly 32 bytes (256 bits) for aes-256-cbc
const key = crypto.createHash('sha256').update(String(rawKey)).digest('base64').substring(0, 32);

const encrypt = (text) => {
  if (!text) return null;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

const decrypt = (encryptedText) => {
  if (!encryptedText) return null;
  try {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedData = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err);
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt
};
