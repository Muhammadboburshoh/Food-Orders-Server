const router = require("express").Router()

const products = require("./model")

/* GET all products. */
router.get('/', async function(req, res, next) {

  const tables = await products.tables()
  // rows(tablesSQL)

  const uygurProducts = await products.getAll(1)
  // rows(productsSQL, 1);

  const japanProducts = await products.getAll(2)
  // rows(productsSQL, 2)

  const milliyProducts = await products.getAll(3)
  // rows(productsSQL, 3)

  const turkProducts = await products.getAll(4)
  // rows(productsSQL, 4)

  const ichimlikProducts = await products.getAll(5)
  // rows(productsSQL, 5)

  res.send({
      tables,
      uygurProducts,
      japanProducts,
      milliyProducts,
      turkProducts,
      ichimlikProducts
  })
})


/* router.get("/", async (req, res) => {

  console.log(await subjects.getAll());
  res.send(await subjects.getAll())

})
 */
module.exports = router