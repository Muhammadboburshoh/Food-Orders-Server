const { rows, row } = require("../../../util/database")

/*
  Insert order model
*/
const createOrderItemSQL = `
  insert into order_item(product_id, item_count, table_id)
    values ($1, $2, $3)
  returning *
`
const createOrderSQL = `
  insert into orders(table_id) values ($1) returning *
`

const createOrderItem = ({productId, itemCount, tableId}) => row(createOrderItemSQL, productId, itemCount, tableId)

const createOrder = ({ tableId }) => row(createOrderSQL,  tableId)

/*
  getOrders
*/

const successfulOrdersSQL = `
  select
    t.table_number as table,
    array_agg(p.product_price) as price,
    array_agg(oi.item_count) as count,
    array_agg(p.product_name)as product
  from
    order_item as oi
  join
    products as p on p.product_id = oi.product_id
  join 
    tables as t on t.table_id = oi.table_id
  join
    orders as o on o.table_id = t.table_id
    where o.order_status = 1
  group by
    o.table_id,
    t.table_id
`
const successfulOrders = () => rows(successfulOrdersSQL)


const failedSuccessfulOrdersSQL = `
  select
    t.table_number as table,
    array_agg(p.product_price) as price,
    array_agg(oi.item_count) as count,
    array_agg(p.product_name)as product
  from
    order_item as oi
  join
    products as p on p.product_id = oi.product_id
  join 
    tables as t on t.table_id = oi.table_id
  join
    orders as o on o.table_id = t.table_id
    where o.order_status = 0
  group by
    o.table_id,
    t.table_id
`
const failedSuccessfulOrders = () => rows(failedSuccessfulOrdersSQL)

// buyurtma barayotgan odam bergan buyurtmasini ko'rib turishi uchun
const newOrdersSQL = `
  select
    t.table_number as table,
    array_agg(p.product_price) as price,
    array_agg(oi.item_count) as count,
    array_agg(p.product_name)as product
  from
    order_item as oi
  join
    products as p on p.product_id = oi.product_id
  join 
    tables as t on t.table_id = oi.table_id
  join
    orders as o on o.table_id = t.table_id
    where o.order_status = 0 and t.table_id = $1
  group by
    o.table_id,
    t.table_id
`

const newOrders = (tableId) => rows(newOrdersSQL, tableId)


module.exports.createOrderItem = createOrderItem
module.exports.createOrder = createOrder
module.exports.successfulOrders = successfulOrders
module.exports.failedSuccessfulOrders = failedSuccessfulOrders
module.exports.newOrders = newOrders
