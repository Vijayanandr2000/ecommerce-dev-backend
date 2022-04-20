const { 
    create, 
    update, 
    getCartItem,
} = require('../controllers/cart');
const { authJwt } = require('../middleware')

module.exports = function(app) {
    app.post('/ecomm/api/v1/cart/create',[authJwt.verifyToken], create);

    app.put('/ecomm/api/v1/cart/:id',[authJwt.verifyToken], update);
    app.get('/ecomm/api/v1/cart/get/:id',[authJwt.verifyToken], getCartItem);

}