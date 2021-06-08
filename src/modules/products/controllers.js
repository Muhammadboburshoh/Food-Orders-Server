const router = require("express").Router()

const subjects = require("./model")

router.get("/", async (req, res) => {

  res.send(await subjects.getAll())

})

module.exports = router