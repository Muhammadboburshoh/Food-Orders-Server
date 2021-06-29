const router = require("express").Router()

const order = require("./model")

/*
  products Order
*/
router.post("/", async (req, res) => {

    const orderItem = await order.createOrderItem(req.body)
console.log(req.body);
    if(orderItem) {
      res.status(201).send(orderItem)
    } else {
    res.status(401).end()
    }

})

router.get("/order", async(req, res )=>{

  const newOrder = await order.createOrder(req.body)

  if(newOrder) {
    res.status(401).send(newOrder)
  } else {
  res.status(401).end()
  }
})

router.get("/", async(req, res) => {

  const successfulOrders = await order.successfulOrders()

  if(successfulOrders) {
    res.status(401).send(successfulOrders)
  } else {
  res.status(401).end()
  }

})

router.get("/no", async(req, res) => {

  const noSuccessfulOrders = await order.noSuccessfulOrders()

  if(noSuccessfulOrders) {
    res.status(401).send(noSuccessfulOrders)
  } else {
  res.status(401).end()
  }

})

module.exports = router