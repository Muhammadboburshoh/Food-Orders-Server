const router = require("express").Router()

const { verify } = require("../../../util/jwt")
const { tablesArr, createTable, editTableFn, deleteTableFn, adminTables } = require("./model")

/* GET tables. */
router.get('/', async function(req, res, next) {

  try {

    const tables = await tablesArr()
    if(tables) {
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

/* aqdmin pagination */
router.get('/admin', async function(req, res, next) {

  try {

    const page = req.query.page

    const tables = await adminTables(page)
    if(tables) {
      res.status(201).send(tables)
    } else {
      res.status(401).end()
    }

  } catch(e) {
    console.log(e)
    res.statusMessage = e.message
    res.status(401).end()
  }

})

/*
  Create table
*/
router.post("/", async (req, res) => {

  try{

    const user = await verify(req.headers.access_token)

    if(user.role) {
      const newTable = await createTable(req.body)

      if(newTable) {
        res.status(201).send(newTable)
      } else {
      res.status(401).end()
      }
    } else {
      throw Error
      res.status(403).end()
    }

  } catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }
})

/*
  Edit table
*/
router.put("/:id", async(req, res) => {

  try{

    const user = await verify(req.headers.access_token)

    const tableId = req.params.id

    if(user.role) {
      const editTable = await editTableFn({...req.body, tableId})

      if(editTable) {
        res.status(201).send(editTable)
      } else {
      res.status(401).end()
      }
    } else {
      throw Error
      res.status(403).end()
    }

  } catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})

/*
  Delete table
*/
router.delete("/del/:id", async(req, res) =>{

  try{

    const user = await verify(req.headers.access_token)

    if(user.role) {
      const deleteTable = await deleteTableFn(req.params.id)

      if(deleteTable) {
        res.status(201).send(deleteTable)
      } else {
      res.status(401).end()
      }
    } else {
      throw Error
      res.status(403).end()
    }

  } catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }
})
module.exports = router