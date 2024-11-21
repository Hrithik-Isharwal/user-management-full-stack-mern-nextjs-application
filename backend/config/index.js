const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('user_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {max:5, min:0, idle: 10000}
})

sequelize.authenticate().then(()=>{
    console.log("Database Connected");
}).catch(error=>{
    console.log("Error: ", error);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/users')(sequelize, DataTypes);