const router = require("express").Router()
const { v4 } = require("uuid")
const path = require("path")


const { verify }= require("../../../util/jwt")
const categories = require("./model")



/*
  Get categories
*/

router.get("/", async (req, res) => res.send(await categories.categories()))


/*
  POST categories
*/
router.post("/", async(req, res) => {

  try {

    const user = await verify(req.headers.access_token)

    if(user.user_role == 1) {

      const category = await categories.createCategory(req.body)

      if(category) {
        res.status(201).send(category)
      }else {
        res.status(400).end()
      }
    }
    else {
      res.status(401).end()
    }

  }
  catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})


/*
  EDIT categories
*/
router.put("/:id", async (req, res) => {
  try {

    const user = await verify(req.headers.access_token)

    if(user.user_role == 1) {

      const category = await categories.editCategory({...req.body, categoryId: req.params.id})

      if(category) {
        res.status(201).send(category)
      }else {
        res.status(400).end()
      }
    }
    else {
      res.status(401).end()
    }

  }
  catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }
})


/*
  DELETE categories
*/
router.delete("/del/:id", async(req, res) => {

  const user = await verify(req.headers.access_token)

  try {

    if(user.user_role == 1) {

      const deleteCatigory = await categories.deleteCatigory(req.params.id)
    
      if(deleteCatigory) {
        res.status(201).send(deleteCatigory)
      } else {
        res.status(401).end()
      }
    }
    else {
      res.status(401).end()
    }
  } catch(e) {
    res.statusMessage = e
    res.status(401).end()
    console.log(e);
  }

})



module.exports = router