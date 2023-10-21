const jwt = require('jsonwebtoken');
const rolServices = require('../services/rol.service');
require('dotenv').config();

const tokenSign = async (usuario)=>{
    const {usuario_id, correo_electronico, nombre_usuario, rol_id, foto} = usuario;
    return jwt.sign(
        {
            usuario_id,
            rol_id,
            nombre: nombre_usuario,
            correo_electronico,
            foto
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"6h"
        }
    );
}

module.exports = {
    tokenSign
}