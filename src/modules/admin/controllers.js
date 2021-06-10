const router = require("express").Router()


const admin = require("./model")
const { sign }= require("../../../util/jwt")

/*
  ADMIN login
*/

router.post('/', async(req, res) => {

  const user = await admin.userLogin(req.body)

  if (user) {

    const accessToken = sign(user)

    res.status(201).send({ user, accessToken, })
  }
  else {
    res.status(401).end()
  }

})

module.exports = router