const { DataTypes } = require('sequelize');
const db = require('../connection');
const User = require('./User');
const Libro = require('./Libro');
const UserPrestamo = db.define('usuario_prestamo',{
    id_prestamo:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    fecha_prestamo: {
        type: DataTypes.DATE
    },
    fecha_devolucion:{
        type:DataTypes.DATE
    },
    devuelto:{
        type:DataTypes.BOOLEAN
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id_usuario'
        }
    },
    id_libro: {
        type: DataTypes.INTEGER,
        references: {
            model: Libro,
            key: 'id_libro'
        }
    },
    timestamps: false,
    freezeTableName: true,
    tableName: 'usuario_prestamo'
})


UserPrestamo.belongsTo(User,{foreignKey: 'id_usuario'});
UserPrestamo.belongsTo(Libro,{foreignKey: 'id_libro'});

module.exports= UserPrestamo