const config = {
  PORT: process.env.PORT || 4000,
  PG: {
    host: 'localhost',
    user: 'muhammadbobur',
    password: '1111',
    database: 'quiz_app',
    port: 5432
  }
}


module.exports = config