module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        price: {
            type: Sequelize.INTEGER,
        },
    },
    {
        tableName: 'carts'
    });
    return Cart;
}