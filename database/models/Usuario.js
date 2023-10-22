const { DataTypes } = require('sequelize');
const db = require('../connection');
const Rol = require('./Rol');
const Usuario = db.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_usuario: {
        type: DataTypes.STRING
    },
    nombres: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.STRING
    },
    id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'id_rol'
        }
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

Usuario.prototype.toJson = function () {
    let values = Object.assign({}, this.get());
    delete values.contrasenia;
    return values;
}



Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });
module.exports = Usuario
