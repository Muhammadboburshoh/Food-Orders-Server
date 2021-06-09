const { rows, row } = require("../../../util/database")

const productsSQL = `
  select
    p.product_id,
    p.product_name,
    p.product_price,
    p.product_image,
    p.product_description,
    p.product_available,
    c.category_name
  from
    products as p
  join
    categories as c on c.category_id = p.category_id and c.category_id = $1
`

const tablesSQL = `
  select * from tables
`

const getAll = (catigoryId) => {
  return rows(productsSQL, catigoryId)
}

const tables = () => {
  return rows(tablesSQL)
}

module.exports.getAll = getAll
module.exports.tables = tables
