const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegram00',
    'milkfist',
    'milkfist',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
)