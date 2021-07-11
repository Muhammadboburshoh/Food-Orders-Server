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

const allUnfulfilledOrdersSQL = `
  select
    o.order_id as id,
    t.table_number as table_num,
    array_agg(p.product_name) as product,
    o.time as created,
    array_agg(oi.product_count) as count,
    sum(oi.product_count) as all_count,
    sum(p.product_price * oi.product_count) as price
  from
    orders as o
  join
    order_item as oi on o.order_id = oi.order_id
  join
    products as p on p.product_id = oi.product_id
  join
    tables as t on t.table_id = o.table_id
  where
    o.status = 1
  group by
    id, table_num, time, status
  order by
    id DESC
  limit
    10
  offset
    (($1 - 1) * 10)
`
const allUnfulfilledOrders = (page) => rows(allUnfulfilledOrdersSQL, page)



const allCompletedOrdersSQL = `
  select
    o.order_id as id,
    t.table_number as table_num,
    array_agg(p.product_name) as product,
    o.time as created,
    array_agg(oi.product_count) as count,
    sum(oi.product_count) as all_count,
    sum(p.product_price * oi.product_count) as price
  from
    orders as o
  join
    order_item as oi on o.order_id = oi.order_id
  join
    products as p on p.product_id = oi.product_id
  join
    tables as t on t.table_id = o.table_id
  where
    o.status = 2
  group by
    id, table_num, time, status
  order by
    id DESC
  limit
    10
  offset
    (($1 - 1) * 10)
`

const allCompletedOrders = (page) => rows(allCompletedOrdersSQL, page)

/*
  Finished order
*/
const completedOrderSQL = `
  update orders set status = 2 where status = 1 and order_id = $1 returning *;
`

const completedOrder = ({ orderId }) => row(completedOrderSQL, orderId)


const deleteOrderSQL = `
  delete from orders where order_id = $1 returning *
`

const deleteOrder = ({orderId}) => row(deleteOrderSQL, orderId)

module.exports.newOrder = newOrder
module.exports.findishedOrder = findishedOrder
module.exports.pendingOrders = pendingOrders
module.exports.deleteItemOrder = deleteItemOrder

/* admin export */
module.exports.allUnfulfilledOrders = allUnfulfilledOrders
module.exports.allCompletedOrders = allCompletedOrders
module.exports.completedOrder = completedOrder
module.exports.deleteOrder = deleteOrder



