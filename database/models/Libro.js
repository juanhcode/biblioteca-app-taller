const { DataTypes } = require('sequelize');
const db = require('../connection');

const Libro = db.define('libro', {
    id_libro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Libro