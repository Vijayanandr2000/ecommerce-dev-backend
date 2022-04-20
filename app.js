const express = require('express');
const serverConfig = require('./config/server.config');
const db = require('./models');
const cors = require("cors");


const app = express();

app.use(cors());

app.use(express.json());

const init = () =>{
    let categoryData = [
        {
            name: 'Electronics',
            description: 'This section has a electrical appliance.'
        },
        {
            name: 'Vegetables',
            description: 'This section has a fresh vegies.'
        }
    ]
    var rolesdata = [
        {
            id: 2,
            name:"admin"
        },
        {
            id: 1,
            name: "user"
        }
    ]
    let ProductData = [
        {
            "name":"samsung1",
            "description":"To mix the things.",
            "price":10000,
            "categoryId":2
        }
    ]
    db.role.bulkCreate(rolesdata).then(()=>{
        console.log("Role's are created successfully");
    }).catch((err)=>{
        console.log("Role's are not created",err.message);
    })
    
    db.category.bulkCreate(categoryData).then(()=>{
        console.log("Data's are created successfully");
    }).catch((err)=>{
        console.log("Data's are not created",err.message);
    })

    db.product.bulkCreate(ProductData).then(()=>{
        console.log("Data's are created successfully");
    }).catch((err)=>{
        console.log("Data's are not created",err.message);
    })
}



db.sequelize.sync({force: true}).then(()=>{
    console.log(`DB Table's are updated`);
    init()
}).catch(err=>{
    console.log(err.message)
})

app.get('/',(req,res)=>{
    res.send('SERVER SIDE IS STARTED');
})

require('./routes/category')(app)
require('./routes/product')(app)
require('./routes/auth')(app)
require('./routes/cart')(app)

app.listen(serverConfig.PORT,async() => {
    console.log(`server starts in PORT ${serverConfig.PORT}`);
    try {
        await db.sequelize.authenticate();
        console.log('DB connected successfully');
    } catch (error) {
        console.log("DB is not connected", error.message);
    }
});