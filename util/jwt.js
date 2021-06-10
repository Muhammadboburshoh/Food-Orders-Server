const jwt = require("jsonwebtoken")

const SECRET = "SECRET_KEY"

const sign = pyload => jwt.sign(pyload, SECRET, {
  expiresIn: "1000h"
})

const verify = accessToken => jwt.verify(accessToken, SECRET)

module.exports.sign = sign
module.exports.verify = verify