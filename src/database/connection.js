const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: 'capstone_db',
    username: 'root',
    password: 'tothemax1704',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => console.log("connected to db"))
    .catch(err => console.error(err));

module.exports = sequelize;
global.sequelize = sequelize;