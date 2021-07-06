const { rows, row } = require("../../../util/database")

/*
  Insert order model
*/
const newOrderSQL =  `
  insert into orders(table_id) values ($1);
  select dont_duplicate_orderitems($2, (select order_id from orders where table_id = $1 and status = 0), $3);
`
const newOrder = ({tableId, productCount, productId}) => row(newOrderSQL, tableId, productCount, productId)

/*
  Finished order
*/
const findishedOrderSQL = `
  update orders set status = 1 where status = 0 and table_id = $1 returning *;
`

const findishedOrder = ({tableId}) => row(findishedOrderSQL, tableId)



module.exports.newOrder = newOrder