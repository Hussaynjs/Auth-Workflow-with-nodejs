const crypto = require('crypto')


const hashPassword = (string) => crypto.createHash('md5').update(string).digest('hex')




module.exports = hashPassword