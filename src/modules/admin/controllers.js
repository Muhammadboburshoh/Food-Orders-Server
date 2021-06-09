const router = require("express").Router()


const admin = require("./model")
const { sign }= require("../../../util/jwt")

/*
  ADMIN login
*/

router.post('/', (req, res) => {

  res.send("OK")
})

module.exports = router