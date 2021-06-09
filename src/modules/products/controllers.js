const router = require("express").Router()
const { v4 } = require("uuid")
const path = require("path")

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
  res.status(401).end()
})



/*
  create Product
*/
router.post("/addproducts", async (req, res) => {

  try {

    let { productImage } = req.files
    const mimetype = productImage.mimetype.split("/")

    // let { productName, productPrice, catigoryId } = req.body
    
  
    let photoName = v4()
    
    const imgPath = path.join(__dirname, "/images",photoName + "." + mimetype[1])

    console.log(req.body);
  
    if(mimetype[0] === "image") {
      productImage.mv(imgPath, (err) =>{
        console.log(err);
      })
    }

    res.send("OK")

    // res.send(await products.createProduct({...req.body, productImage: photoName + "." + mimetype[1]}))
  }catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }


})


/*  */

module.exports = router