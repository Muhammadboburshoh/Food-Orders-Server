const { Pool } = require('pg')

const {host, user, password, database, port} = require('../_config').PG

const pool = new Pool({
  host,
  user,
  password,
  database,
  port
})

const rows = async (SQL, ...params) => {

  const connect = await pool.connect()

  try {

    const { rows } = await connect.query(SQL, params)

    return rows

  }
  catch(e) {
    throw e
  }
  finally {
    connect.release()
  }
}

const row = async (SQL, ...params) => {

  const connect = await pool.connect()

  try {

    const { rows: [row] } = await connect.query(SQL, params)

    return row
  }
  catch(e) {
    throw e
  }
  finally {
    connect.release()
  }
}

module.exports.rows = rows
module.exports.row = row