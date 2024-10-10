const Sequelize = require('sequelize');

const sequelize = new Sequelize('baseldatabase', 'root', 'Mohammad_161281', {
    host: '127.0.0.1',
    dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

module.exports = sequelize;
