const router = require("express").Router()

const order = require("./model")

/*
  Create order
*/
router.post("/", async (req, res) => {

  try {

    const newOrder = await order.newOrder(req.body)
    console.log(req.body);

    if(newOrder) {
      res.status(201).send(newOrder)
    } else {
      res.status(401).end()
    }

  } catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})

router.put("/", async (req, res) => {

  try {

    const finishedOrder = await order.findishedOrder(req.body)

    if(finishedOrder) {
      res.status(201).send(finishedOrder)
    } else {
      res.status(401).end()
    }

  } catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})

router.get("/:id", async(req, res) => {

  try{
    const tableId = req.params.id

    const pendingOrders = await order.pendingOrders(tableId)

    if(pendingOrders) {
      res.status(201).send(pendingOrders)
    } else {
      res.status(401).end()
    }

  }catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})



module.exports = router