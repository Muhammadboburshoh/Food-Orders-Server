const router = require("express").Router()

const order = require("./model")

/*
    products Order
*/
router.post("/", async (req, res) => {

  res.send(await order.order(req.body))
})

module.exports = router