const { tokenSign } = require('../helpers/generateToken');
const usuarioService = require('../services/usuario.service');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { nombre_usuario, contrasenia } = req.body;
        const validacionNombreUsuario = await usuarioService.validacionNombreUsuario(nombre_usuario);
        const validacionContrasenia = bcrypt.compareSync(contrasenia, validacionNombreUsuario.contrasenia);

        if (!validacionNombreUsuario){
            return res.status(404).json({
                msg: 'No existe el usuario: ' + nombre_usuario
            });
        }
        if (!validacionContrasenia) {
            return res.status(401).json({
                msg: 'Contrasenia incorrecta'
            });
        }

        const token = await tokenSign(validacionNombreUsuario);

        res.status(200).json({
            validacionNombreUsuario,
            token
        })
        
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login
}