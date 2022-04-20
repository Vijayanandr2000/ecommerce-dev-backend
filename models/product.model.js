/*
==>Product Schema:
    1.id
    2.name
    3.description
    4.price
*/

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

    },
    {
        tableName: 'products'
    });
    return Product;
}