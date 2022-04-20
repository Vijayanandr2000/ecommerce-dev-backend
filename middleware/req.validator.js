const db = require('../models')

const validateCategoryReq = (req,res,next) => {
    // validate category name NOTNULL
    if(!req.body.name){
        res.status(400).send({ 
            message: "Name of the category is required"
        })
        return;
    }
    next();
}

const validateProductReq = (req,res,next) => {
    let { name, description, price, categoryId } = req.body;
    // validate product name NOTNULL
    if(!name && !price){
        res.status(400).send({ 
            message: "Name of the product is required"
        })
        return;
    }
    if(categoryId){
        db.category.findByPk(categoryId).then(resp=>{
            if(!resp){
                res.status(200).send({ 
                    message: "CategoryId is not valid",
                    resp
                })
                return;
            } else{
                if(price <= 0 || !price){
                    res.status(400).send({ 
                        message: "Price seems to be out of range"
                    })
                    return;
                }
                next();
            }
            
        }).catch(err=>{
            res.status(500).send({ 
                message: err.message
            })
            return;
        })

    }else{
        res.status(400).send({ 
            message: "categoryId of the product is required"
        })
        return;
    }
    
}

const validateCategoryInParamReq = (req, res,next) => {
    let categoryId = req.params.categoryId;

    if(categoryId){
        db.category.findByPk(categoryId).then(resp=>{
            if(!resp){
                res.status(400).send({ 
                    message: "CategoryIds is not valid"
                })
                return;
            }
            next()
        }).catch(err=>{
            res.status(500).send({ 
                message: err.message
            })
            return;
        })
    } else{
        res.status(400).send({ 
            message: "categoryId of the product is required"
        })
        return;
    }
}

module.exports = {
    validateCategoryReq,
    validateProductReq,
    validateCategoryInParamReq
}