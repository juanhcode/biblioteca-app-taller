const { DataTypes } = require('sequelize');
const db = require('../connection');
const Rol = require('./Rol');
const User = db.define('usuario',{
    id_usuario:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nombre_usuario: {
        type: DataTypes.STRING
    },
    nombres:{
        type:DataTypes.STRING
    },
    apellidos:{
        type:DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.STRING
    },
    rol_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'id_rol'
        }
    },
    timestamps: false,
    freezeTableName: true,
})

User.prototype.toJson = function(){
    let values = Object.assign({},this.get());
    delete values.contrasenia;
    return values;
}

User.belongsTo(Rol,{foreignKey: 'id_rol'});
module.exports= User