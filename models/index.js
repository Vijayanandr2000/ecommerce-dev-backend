/*
==>This file is used for: 
    1.Creating db connection with the help of sequelize ORM.
    2.Export all functionalities of models.
    3.If someone imports this index.js then they can just import ./models.
    4.If some wants all this code they can use module name dbs.
*/
// DB Connection -> START

const Sequelize = require('sequelize');
const dbConfig = require('../config/config.json');
const env = "production";
const db = dbConfig[env];

const sequelize = new Sequelize(
    db.database,
    db.username,
    db.password,
    db.dialectInfo,
);

// DB Connection -> END

// Exporting as Modules 
const dbs = {};
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;
dbs.category = require('../models/category.model')(sequelize, Sequelize);
dbs.product = require('../models/product.model')(sequelize, Sequelize);
dbs.user = require('../models/user.model')(sequelize, Sequelize);
dbs.role = require('../models/role.model')(sequelize, Sequelize);
dbs.cart = require('../models/cart.model')(sequelize, Sequelize);

// set the one to many relation b/w category and product
dbs.category.hasMany(dbs.product)

dbs.role.belongsToMany(dbs.user, {
    through : 'user_role',
    foreignKey : 'roleId',
    otherKey : 'userId'
})
dbs.user.belongsToMany(dbs.role, {
    through : 'user_role',
    foreignKey : 'userId',
    otherKey : 'roleId'
});

dbs.user.hasMany(dbs.cart);

dbs.cart.belongsToMany(dbs.product, {
    through : 'cart_product',
    foreignKey : 'cartId',
    otherKey : 'productId'
})
dbs.product.belongsToMany(dbs.cart, {
    through : 'cart_product',
    foreignKey : 'productId',
    otherKey : 'cartId'
});

dbs.ROLE = ['user', 'admin']

module.exports = dbs;