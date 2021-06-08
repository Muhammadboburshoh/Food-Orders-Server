const { rows, row } = require("../../../util/database")

const GET_ALL = `
  select * from products;
`

const getAll = () => {
  return row(GET_ALL)
}

module.exports.getAll = getAll