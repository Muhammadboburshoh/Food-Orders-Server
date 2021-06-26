const { rows, row } = require("../../../util/database")


/*
  GET categories model
*/
const categoriesSQL = `
  select * from categories
`

const categories = () => rows(categoriesSQL)

/*
  Create category model
*/
const createCategorySQL = `
  insert into categories(category_name) values ($1) returning *
`

const createCategory = ({categoryName}) => row(createCategorySQL, categoryName)


/*
  Edit category model
*/
const editCategorySQL = `
  update categories set
    category_name = coalesce($2, category_name)
  where
    category_id = $1
  returning *
`

const editCategory = ({categoryName, categoryId}) => row(editCategorySQL, categoryId, categoryName)


/*
  Delete category model
*/
const deleteCatigorySQL = `
  delete from categories
  where
    category_id = $1
  returning *
`
const deleteCatigory = (categoryId) => row(deleteCatigorySQL, categoryId)


/*
  EXPORT modules
*/
module.exports.categories = categories
module.exports.createCategory = createCategory
module.exports.editCategory = editCategory
module.exports.deleteCatigory = deleteCatigory