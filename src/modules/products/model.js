const { rows, row } = require("../../../util/database")


/*
  ALL Products model
*/
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

const getAll = (catigoryId) => rows(productsSQL, catigoryId)


/*
  Table model
*/
const tablesSQL = `
  select * from tables
`

const tables = () => {
  return rows(tablesSQL)
}


/*
  CREATE product Model
*/
const createProductSQL = `
  insert into products (
    product_name,
    product_price,
    product_image,
    category_id
  ) values
  ($1, $2, $3, $4)
`

const createProduct = ({productName, productPrice, productImage, catigoryId}) => {
  return row(createProductSQL, productName, productPrice, productImage, catigoryId)
}

module.exports.getAll = getAll
module.exports.tables = tables
