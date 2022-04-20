/*
- This contain all logic for product controller.
- Whenever user will make a CRED ,that req will be called in controller
*/

const db = require('../models');
const Product = db.product;

// create and save a product
const create = async(req,res) => {
    let { name, description, price,categoryId } = req.body;
    
    //create product object in db
    let product = {
        name,
        description,
        price,
        categoryId

    }; 

    Product.create(product).then((resp) => {
        res.status(201).send({ 
            message:'Product is created successfully',
            data: product,
            resp
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        })
    })


}

// Update an existing product
const update = async(req, res) => {
    let { name, description, price } = req.body;
    let id = req.params.id; 
    
    // validate product name NOTNULL
    if(!name && !price){
        res.status(400).send({ 
            message: "Name of the product is required"
        })
        return;
    }
    
    //update product object in db
    let product = {
        name,
        description,
        price
    }; 

    Product.update(product,{
        where: { id }
    }).then((resp) => {
        res.status(201).send({ 
            message:'Product is updated successfully',
            data: product,
            resp
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        })
    })
}

// Delete an existing product
const deleteProduct = async(req, res) => {
    let id = req.params.id; 

    Product.destroy({
        where: { id },
        returing: true,
    }).then((resp) => {
        res.status(201).send({ 
            message:'Product is deleted successfully',
            resp
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        })
    })
}

// Find by primary key
const findByPrimaryKey = async(req, res) => {
    let id = req.params.id;

    Product.findByPk(id).then((resp) => {
        res.status(200).send(resp);
    }).catch((err) => {
        res.status(500).send({ 
            message: err.message
        })
    })
}

// Find by findAll
const findAll = async(req, res) => {
    let name = req.query.name;
    let promise;
    if(name){
        promise = Product.findAll({
            where: { name }
        })
    } else{
        promise = Product.findAll();
    }
    promise.then((resp) => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

    
}

const findBycategoryId = async(req, res) => {
    let categoryId = req.params.categoryId;
    let promise;
    if(categoryId){
        promise = Product.findAll({
            where: { categoryId }
        })
    }
    promise.then((resp) => {
        if(resp.length)
        res.status(200).send(resp);
        else
        res.status(200).send({
            message:"No Product Found"
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

module.exports = { 
    create, 
    update, 
    deleteProduct,
    findByPrimaryKey,
    findAll,
    findBycategoryId
};