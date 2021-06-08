const config = {
  PORT: process.env.PORT || 4000,
  PG: {
    host: 'localhost',
    user: 'muhammadbobur',
    password: '1111',
    database: 'orders_food',
    port: 5432
  }
}


module.exports = config