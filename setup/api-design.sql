/* 
    -GET / products
*/
-products(): {allProducts}

/*
    POST / orders
*/
-orders(productId, tableId, productCount): {orderId, orderTime, productName, productPrice, tableNumber}

/*
    POST / addproduct
*/
-addproduct(productName, catigoryId, productPrice, productImg): {productId, productName, catigoryName}

/*
    PUT / edit/:id
*/
-edit/:id (productName, catigoryId, productPrice, productImg): {productName, catigoryId, productPrice, productImg}

/*
    DELETE / delete
*/

-delete()