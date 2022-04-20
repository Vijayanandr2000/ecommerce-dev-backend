const db = require('../models');
const Product = db.product;
const Cart = db.cart;

const create = (req, res) => {
    let userId = req.userId;

    let cartObj = {
        userId
    }

    Cart.create(cartObj).then((cart)=>{
        res.status(200).send({
            message:"Cart created successfully",
            cart
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })


}

const update = (req, res) => {
    let cartId = +req.params.id;
    let { productId } = req.body;

    Cart.findByPk(cartId).then((cart) => {
        Product.findAll({
            where:{
                id: productId
            }
        }).then((products) => {
            if(!products){
                return res.status(400).send({
                    message: 'Product not Exist',
                })
            }
            cart.setProducts(products).then(async()=>{
                let selectedProduct = [];

                let totalPrice = 0;
                await cart.getProducts().then(product =>{
                    selectedProduct.push([...product]);
                    product.map(list => totalPrice += list.price);
                })

                res.status(200).send({
                    message: 'Product successfully updated',
                    cart,
                    products,
                    selectedProduct,
                    totalPrice
                })

            }).catch((err)=>{
                return res.status(500).send({
                    message: err.message
                })
            })

        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })

    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

const getCartItem = (req, res) => {
    let cartId = +req.params.id;

    Cart.findByPk(cartId).then(async(cart) => {
          
    let totalPrice = 0, selectedProduct = [];
    await cart.getProducts().then(product =>{
        selectedProduct.push([...product]);
        product.map(list => totalPrice += list.price);
    })

    res.status(200).send({
        message: 'Product successfully updated',
        cart,
        selectedProduct,
        totalPrice
    })

    }).catch((err)=>{
        return res.status(500).send({
            message: err.message
        })
    })
}

module.exports = {
    create,
    update,
    getCartItem
}