const Rol = require('../database/models/Rol');

const validacionRol = async (rol) => {
    const existeRol = await Rol.findOne({
        where: {
            nombre_rol: rol
        }
    })
    return existeRol;
}

const validacionExisteRol = async (id) => {
    const existeRol = await Rol.findByPk(id)
    return existeRol;
}

module.exports = {
    validacionRol,
    validacionExisteRol
}