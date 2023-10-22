const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenSign = async (usuario)=>{
    const {id_usuario, nombre_usuario, rol_id} = usuario;
    console.log(nombre_usuario);
    return jwt.sign(
        {
            id_usuario,
            rol_id,
            nombre_usuario: nombre_usuario,
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