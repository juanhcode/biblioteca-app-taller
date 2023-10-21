const { DataTypes } = require('sequelize');
const db = require('../connection');
const db = require('./Rol');
const User = db.define('user',{
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
            key: 'rol_id'
        }
    },
    timestamps: false,
    freezeTableName: true,
    tableName: 'usuario'
})

User.prototype.toJson = function(){
    let values = Object.assign({},this.get());
    delete values.contrasenia;
    return values;
}

User.belongsTo(Rol,{foreignKey: 'rol_id'});
module.exports= User