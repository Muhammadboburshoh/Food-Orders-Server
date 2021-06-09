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

const getAll = (catigoryId) => rows(productsSQL, catigoryId)



const tablesSQL = `
  select * from tables
`

const tables = () => {
  return rows(tablesSQL)
}


const orderSQL = `
  insert into orders(
    table_id,
    product_id,
    order_product_count
  ) values
  ($1, $2, $3) RETURNING *
`

const order = ({tableId, productId, productCount}) => row(orderSQL, tableId, productId, productCount)


module.exports.getAll = getAll
module.exports.tables = tables
module.exports.order = order
