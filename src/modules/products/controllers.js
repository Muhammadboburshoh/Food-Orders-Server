const router = require("express").Router()
const { v4 } = require("uuid")
const path = require("path")


const { verify }= require("../../../util/jwt")
const products = require("./model")

/* GET all products. */
router.get('/:id/:page', async function(req, res, next) {
  const catigoryId = req.params.id
  const page = req.params.page
  const catigoryProducts = await products.getAll(catigoryId, page)

  if(catigoryProducts) {
    res.status(201).send(catigoryProducts)
  } else {
    res.status(401).end()
  }
})


/*
  create Product
*/
router.post("/addproducts", async (req, res) => {

  try {

    const user = await verify(req.headers.access_token)

    if(user.role == 1) {

      let { productImage } = req.files
      const mimetype = productImage.mimetype.split("/")


      let photoName = v4()

      const imgPath = path.join(__dirname, "/images",photoName + "." + mimetype[1])

    
      if(mimetype[0] === "image") {
        productImage.mv(imgPath, (err) =>{

        })

        const newProduct =  await products.createProduct({...req.body, productImage: photoName + "." + mimetype[1]})

        if(newProduct) {
          res.status(201).send(newProduct)
        }else {
          res.status(400).end()
        }
      }
      else {
        res.status(401).end()
      }

    }

  }
  catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})


/*
  EDIT Product
*/
router.put("/:id", async (req, res) => {

  try {
    const productId = req.params.id

    const user = await verify(req.headers.access_token)

    if(user.role == 1) {

      if(req.files) {

        let { productImage } = req.files
        const mimetype = productImage.mimetype.split("/")
  
  
        let photoName = v4()
  
        const imgPath = path.join(__dirname, "/images",`${photoName}.${mimetype[1]}`)
  
      
        if(mimetype[0] === "image") {
          productImage.mv(imgPath, (err) =>{
  
          })
          
          const editProduct = await products.editProduct({
            ...req.body,
            productImage: photoName + "." + mimetype[1],
            productId: productId - 0,
          })
  
          if(editProduct) {
            res.status(201).send(editProduct)
          } else {
            res.status(401).end()
          }
  
        }
        else {
          res.status(401).end()
        }
      }
      else {
        const editProduct = await products.editProduct({
          ...req.body,
          productImage: undefined,
          productId: productId - 0,
        })

        if(editProduct) {
          res.status(201).send(editProduct)
        } else {
          res.status(401).end()
        }
      }

    } else {
      res.status(403).end()
    }

  }
  catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})


/*
  Delete Product
*/
router.delete("/del/:id", async(req, res)=> {

  const productId = req.params.id

  const user = await verify(req.headers.access_token)

  if(user.role == 1) {

    const deleteProduct = await products.deleteProduct(productId)

    if(deleteProduct) {

      res.status(201).send(deleteProduct)
    } else{
      res.status(400).end()
    }
  }
  else {
    res.status(400).end()
  }

})



module.exports = router