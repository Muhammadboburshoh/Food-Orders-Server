const { rows, row } = require("../../../util/database")

const GET_ALL = `
  select
    subject_id,
    name
  from
    subjects
  where subject_id = 12
`

const getAll = () => {
  return row(GET_ALL)
}

module.exports.getAll = getAll