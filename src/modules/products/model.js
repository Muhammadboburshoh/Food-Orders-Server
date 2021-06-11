const { rows, row } = require("../../../util/database")

/*
  ALL Products model
*/
const productsSQL = `
  select
    p.product_id,
    p.product_name,
    p.product_price,
    p.product_image,
    p.product_available,
    c.category_name
  from
    products as p
  join
    categories as c on c.category_id = p.category_id and c.category_id = $1
`

const getAll = (catigoryId) => rows(productsSQL, catigoryId)


/*
  Table model
*/
const tablesSQL = `
  select * from tables
`

const tables = () => {
  return rows(tablesSQL)
}


/*
  CREATE product Model
*/
const createProductSQL = `
  insert into products (
    product_name,
    product_price,
    product_image,
    category_id
  ) values
  ($1, $2, $3, $4) returning *
`

const createProduct = ({productName, productPrice, productImage, catigoryId}) => {

  return row(createProductSQL, productName, productPrice, productImage, catigoryId)
}


/*
  EDIT Product Model
*/
const editProductSQL = `
  update products set
    product_name = coalesce($2, product_name),
    category_id = coalesce($3, category_id),
    product_price = coalesce($4, product_price),
    product_image = coalesce($5, product_image),
    product_available = coalesce($6, product_available)
  where
    product_id = $1
  returning
    product_name,
    category_id,
    product_price,
    product_image,
    product_available
`

const editProduct = ({
    productName,
    categoryId,
    productPrice,
    productImage,
    productAvailable,
    productId
  }) => {

  return row(
    editProductSQL,
    productId,
    productName,
    categoryId,
    productPrice,
    productImage,
    productAvailable
  )
}


/*
  DELETE product
*/
const deleteProductSQL = `
  delete from products
  where
    product_id = $1
  returning *
`

const deleteProduct = (productId) => row(deleteProductSQL, productId)


module.exports.getAll = getAll
module.exports.tables = tables
module.exports.createProduct = createProduct
module.exports.editProduct = editProduct
module.exports.deleteProduct = deleteProduct
