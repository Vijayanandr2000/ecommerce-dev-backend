const db = require('../models')

let Roles = db.role;

const verifyRole = async(req, res, next) => {
    let roles = req.body.roles;
    console.log(roles);
    if(roles === undefined){
        next();
        return;
    }
    
    let data = await Roles.findAll();

    let dbRole = [];
    data.map(role => dbRole.push(role.name))

    dbRole = new Set(dbRole);

    for(let i=0;i<roles.length;i++) {
        if(!dbRole.has(roles[i])){
            return res.status(402).send({
                message:'Invalid Role'
            });
        }
    }

    next();

}

module.exports = {
    verifyRole
}
