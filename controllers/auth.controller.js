const { tokenSign } = require('../helpers/generateToken');
const usuarioService = require('../services/usuario.service');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { correo_electronico, contrasenia } = req.body;
        const validacionCorreo = await usuarioService.validacionCorreo(correo_electronico);
        const validacionContrasenia = bcrypt.compareSync(contrasenia, validacionCorreo.contrasenia);
        
        if (!validacionCorreo){
            return res.status(404).json({
                msg: 'No existe usuario con el correo: ' + correo_electronico
            });
        }
        if (!validacionContrasenia) {
            return res.status(401).json({
                msg: 'Contrasenia incorrecta'
            });
        }

        const token = await tokenSign(validacionCorreo);

        res.status(200).json({
            validacionCorreo,
            token
        })
        
        
    } catch (error) {
        
    }
}

module.exports = {
    login
}