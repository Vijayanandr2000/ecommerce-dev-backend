const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const db= require('../models');


const secretKey = authConfig.secretKey;


const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message: 'No token provided...!'
        })
    }
    jwt.verify(token, secretKey, (err,decoded) => {
        if(err){
            return res.status(401).send({
                message: 'Unauthorized',
                err:err.message
            });
        }

        req.userId = decoded.id;
        next();
    })
    
}

const isAdmin = (req, res, next) => {
    db.user.findByPk(req.userId).then(user => {
        user.getRoles().then(role => {
            for(let i=0;i<role.length;i++) {
                if(role[i].name === 'admin'){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Admin access is required'
            })
        })
    })
}

module.exports = {
    verifyToken,
    isAdmin
}