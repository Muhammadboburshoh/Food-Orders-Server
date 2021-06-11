const router = require("express").Router()
const { v4 } = require("uuid")
const path = require("path")


const { verify }= require("../../../util/jwt")
const products = require("./model")



/*
  Get categories
*/

router.get("/", async (req, res) => res.send(await products.categories()))



module.exports = router