const { Sequelize, Model, DataTypes } = require('sequelize')

class Animals extends Model{}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/animals-app.sqlite'
})


Animals.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.TEXT,
    picLink: DataTypes.TEXT,
    likes: DataTypes.INTEGER
}, {sequelize})

module.exports = Animals