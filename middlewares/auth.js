const {verifyToken} = require('../helpers/verify-jwt');
const usuarioServices = require('../services/usuario.service');

const checkAuth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        console.log("TOKEN: " + tokenData.nombre_usuario)
        const existeUsuario = await usuarioServices.validacionUsuarioId(tokenData.id_usuario);
        if (!existeUsuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en la BD'
            });
        }        
        if(tokenData.nombre_usuario){
            /*
                Guardo la informacion del usuario por si necesito hacer otra validacion a un middleware, de esta manera
                ya se quien es el usuario que esta con ese token.
                Un ejemplo es el verify-rol.js
            */
            req.usuario = existeUsuario;
            next();
        }else{
            res.status(401);
            res.send({error:"Token no valido"});
        }
    } catch (error) {
        res.status(401);
        res.send({error:"Sin autorizacion"})
    }
}

module.exports = checkAuth