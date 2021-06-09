const router = require("express").Router()

const products = require("./model")

/* GET all products. */
router.get('/', async function(req, res, next) {

  const tables = await products.tables()

  const uygurProducts = await products.getAll(1)

  const japanProducts = await products.getAll(2)

  const milliyProducts = await products.getAll(3)

  const turkProducts = await products.getAll(4)

  const ichimlikProducts = await products.getAll(5)

  res.send({
      tables,
      uygurProducts,
      japanProducts,
      milliyProducts,
      turkProducts,
      ichimlikProducts
  })
})


/*
    products Order
*/
router.post("/addproduct", async (req, res) => {

  res.send(await products.order(req.body))
})


module.exports = router