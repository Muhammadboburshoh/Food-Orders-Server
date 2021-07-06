const router = require("express").Router()

const order = require("./model")

/*
  Create order
*/
router.post("/", async (req, res) => {

  try {

    const newOrder = await order.newOrder(req.body)

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

    const finishedOrder = await order.finishedOrder(req.body)

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



module.exports = router