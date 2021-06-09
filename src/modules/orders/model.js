const { rows, row } = require("../../../util/database")


/*
  Orders model
*/
const orderSQL = `
  insert into orders(
    table_id,
    product_id,
    order_product_count
  ) values
  ($1, $2, $3) RETURNING *
`

const order = ({tableId, productId, productCount}) => row(orderSQL, tableId, productId, productCount)

module.exports.order = order
