const rolServices = require('../services/rol.service');

const esBibliotecario = async (req, res, next) => {

    const {nombre_rol} = await rolServices.validacionExisteRol(req.usuario.id_rol);

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    if (nombre_rol !== 'bibliotecario') {
        return res.status(401).json({
            msg: `${req.usuario.nombre_usuario} no es bibliotecario - no puede realizar esta accion`
        })
    }
    

    next(); 
}

module.exports = {
    esBibliotecario
}