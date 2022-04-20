/*
- This contain all logic for category controller.
- Whenever user will make a CRED ,that req will be called in controller
*/

const db = require('../models');
const Category = db.category;

// create and save a category
const create = async(req,res) => {
    let { name, description } = req.body;
   
    
    //create category object in db
    let category = {
        name,
        description
    }; 

    Category.create(category).then((resp) => {
        res.status(201).send({ 
            message:'Category is created successfully',
            data: category,
            resp
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        })
    })


}

// Update an existing category
const update = async(req, res) => {
    let { name, description } = req.body;
    let id = req.params.id; 
    
    // validate category name NOTNULL
    if(!name){
        res.status(400).send({ 
            message: "Name of the category is required"
        })
        return;
    }
    
    //update category object in db
    let category = {
        name,
        description
    }; 

    Category.update(category,{
        where: { id }
    }).then((resp) => {
        res.status(201).send({ 
            message:'Category is updated successfully',
            data: category,
            resp
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        })
    })
}

// Delete an existing category
const deleteCategory = async(req, res) => {
    let id = req.params.id; 

    Category.destroy({
        where: { id },
        returing: true,
    }).then((resp) => {
        res.status(201).send({ 
            message:'Category is deleted successfully',
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

    Category.findByPk(id).then((resp) => {
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
        promise = Category.findAll({
            where: { name }
        })
    } else{
        promise = Category.findAll();
    }
    promise.then((resp) => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

    
}


module.exports = { 
    create, 
    update, 
    deleteCategory,
    findByPrimaryKey,
    findAll,
};