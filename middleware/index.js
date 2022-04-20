const validate = require('./req.validator');
const authJwt = require('./authVerify'); 
const validateRole = require('./verifyRolesExist'); 


module.exports = {
    validate,
    authJwt,
    validateRole
}