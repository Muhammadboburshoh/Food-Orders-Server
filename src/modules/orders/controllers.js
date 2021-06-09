const router = require("express").Router()

const order = require("./model")

/*
    products Order
*/
router.post("/", async (req, res) => {

  try {

    res.send(await order.order(req.body))
  } catch(e) {
    console.log(e)
    res.statusMessage = e.message
    res.status(401).end()
  }
})

module.exports = router