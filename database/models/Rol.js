const { DataTypes } = require('sequelize');
const db = require('../connection');

const Rol = db.define('rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nombre_rol:{
        type: DataTypes.STRING
    }
});

module.exports = Rol;