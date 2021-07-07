const { rows, row } = require("../../../util/database")

/*
  Table model
*/
const tablesSQL = `
  select * from tables
  order by table_number
`

const tablesArr = () => {
  return rows(tablesSQL)
}

/*
  Create Table model
*/
const createTableSQL = `
  insert into tables (table_number) values ($1) returning *
`

const createTable = ({tableNumber}) => row(createTableSQL, tableNumber)


/*
  Edit Table model
*/
const editTableSQL = `
  update tables set
    table_number = coalesce($2, table_number)
  where
    table_id = $1
  returning *
`

const editTableFn = ({tableNumber, tableId}) => row(editTableSQL, tableId, tableNumber)


/*
  Delete Table model
*/
const deleteTableSQL = `
  delete from tables where table_id = $1 returning *
`
const deleteTableFn = (tableId) => row(deleteTableSQL, tableId)

module.exports.tablesArr = tablesArr
module.exports.createTable = createTable
module.exports.editTableFn = editTableFn
module.exports.deleteTableFn = deleteTableFn
