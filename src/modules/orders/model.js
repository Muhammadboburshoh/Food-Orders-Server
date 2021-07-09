const { rows, row } = require("../../../util/database")

const newOrderSQL =  `
  select dont_duplicate_orderitems($1, $2, $3)
`

const newOrder = ({productCount, productId, tableId}) => row(newOrderSQL, productCount, productId, tableId)

/*
  Finished order
*/
const findishedOrderSQL = `
  update orders set status = 1 where status = 0 and table_id = $1 returning *;
`

const findishedOrder = ({tableId}) => row(findishedOrderSQL, tableId)

/*
  GET pending orders
*/

const pendingOrdersSQL = `
  select
    oi.item_id,
    o.table_id,
    oi.product_count,
    p.product_name,
    p.product_price
  from
    orders as o
  join
    order_item as oi on oi.order_id = o.order_id
  join
    products as p on p.product_id = oi.product_id
  where
    o.status = 0 and table_id = $1
`

const pendingOrders = (tableId) => rows(pendingOrdersSQL, tableId)


/* 
  Delete order item
 */
const deleteItemOrderSQL = `
  delete from order_item where item_id = $1 returning *
`

const deleteItemOrder = ({itemId}) => row(deleteItemOrderSQL, itemId)


/* 
  ADMIN PANEL MODEL
*/

const allUnfulfilledOrders = ``

const allCompletedOrders = ``

module.exports.newOrder = newOrder
module.exports.findishedOrder = findishedOrder
module.exports.pendingOrders = pendingOrders
module.exports.deleteItemOrder = deleteItemOrder