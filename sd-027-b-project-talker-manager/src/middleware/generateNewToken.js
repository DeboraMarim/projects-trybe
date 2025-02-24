const crypto = require('crypto');

function generateNewToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateNewToken;
