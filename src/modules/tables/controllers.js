const router = require("express").Router()

const { tablesArr } = require("./model")

/* GET tables. */
router.get('/', async function(req, res, next) {

  try {

    if(tables) {
      const tables = await tablesArr()
      res.send(tables)
    } else {
      throw Error
      res.status(401).end()
    }

  } catch(e) {
    console.log(e)
    res.statusMessage = e.message
    res.status(401).end()
  }

})


module.exports = router