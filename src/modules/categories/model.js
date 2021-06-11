const { rows, row } = require("../../../util/database")


/*
  GET categories model
*/
const categoriesSQL = `
  select * from categories
`

const categories = () => rows(categoriesSQL)


module.exports.categories = categories
