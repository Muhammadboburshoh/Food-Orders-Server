const { rows, row } = require("../../../util/database")

const userLoginSQL = `
  select
    user_id,
    username,
    role
  from users
  where
    username = $1 and password = crypt($2, password)
`

const userLogin = ({username, password}) => {
  return row(userLoginSQL, username, password)
}


module.exports.userLogin = userLogin

