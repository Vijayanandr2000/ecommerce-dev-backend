const { 
    create, 
    update, 
    deleteProduct,
    findByPrimaryKey,
    findAll,
    findBycategoryId
} = require('../controllers/product');
const { validate, authJwt } = require('../middleware')

module.exports = function(app) {
    // Route for POST req to create a product.
    app.post('/ecomm/api/v1/products',[validate.validateProductReq, authJwt.verifyToken, authJwt.isAdmin], create)

    // Route for PUT req to update a product.
    app.put('/ecomm/api/v1/products/:id',[authJwt.verifyToken ,authJwt.isAdmin], update)

    // Route for DELETE req to delete a product.
    app.delete('/ecomm/api/v1/products/:id',[authJwt.verifyToken ,authJwt.isAdmin], deleteProduct)

    // Route for GET req to get a product with the id.
    app.get('/ecomm/api/v1/products/:id', findByPrimaryKey)

    // Route for GET req to get a all product.
    app.get('/ecomm/api/v1/products', findAll)

    app.get('/ecomm/api/v1/category/:categoryId/products',[validate.validateCategoryInParamReq], findBycategoryId)
}