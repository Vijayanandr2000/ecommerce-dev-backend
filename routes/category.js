const { 
    create, 
    update, 
    deleteCategory,
    findByPrimaryKey,
    findAll
} = require('../controllers/category');
const { validate, authJwt } = require('../middleware')

module.exports = function(app) {
    // Route for POST req to create a category.
    app.post('/ecomm/api/v1/categories',[validate.validateCategoryReq, authJwt.verifyToken, authJwt.isAdmin], create)

    // Route for PUT req to update a category.
    app.put('/ecomm/api/v1/categories/:id',[authJwt.verifyToken ,authJwt.isAdmin], update)

    // Route for DELETE req to delete a category.
    app.delete('/ecomm/api/v1/categories/:id',[authJwt.verifyToken ,authJwt.isAdmin], deleteCategory)

    // Route for GET req to get a category with the id.
    app.get('/ecomm/api/v1/categories/:id', findByPrimaryKey)

    // Route for GET req to get a all category.
    app.get('/ecomm/api/v1/categories', findAll)
}