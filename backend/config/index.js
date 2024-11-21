require('dotenv').config({path: './.env.local'});
const {Sequelize} = require('sequelize');

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, "envvvvvvvvvvvv");


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {max:5, min:0, idle: 10000},
    logging: false
})

sequelize.authenticate().then(()=>{
    console.log("Database Connected");
}).catch(error=>{
    console.log("Error: ", error);
});

module.exports = sequelize;