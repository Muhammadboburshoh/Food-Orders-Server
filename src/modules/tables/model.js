const { rows } = require("../../../util/database")

/*
  Table model
*/
const tablesSQL = `
  select * from tables
`

const tablesArr = () => {
  return rows(tablesSQL)
}


module.exports.tablesArr = tablesArr
