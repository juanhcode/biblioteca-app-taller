const usuarioService = require('../services/usuario.service');

const creationUsuario = async (req,res) => {

    const {body} = req;
    
    try {  
        const camposObligatorios = ["nombre_usuario", "nombres", "apellidos", "contrasenia"];
        for (const campo of camposObligatorios) {
            if (!body[campo] || (typeof body[campo] === 'string' && body[campo].trim() == '')) {
              return res.status(400).json({
                msg: `Falta el campo obligatorio: ${campo}`
              })
            }
          }
        
        const validacionNombreUsuario = await usuarioService.validacionNombreUsuario(body.nombre_usuario);
        if (validacionNombreUsuario) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese nombre de usuario: ' + body.nombre_usuario
            });
        }

        const usuarioCreated = await usuarioService.createUsuario(body);
        res.status(201).json({
            msg: `Usuario: ${usuarioCreated.nombre_usuario} ha sido creado correctamente`
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }

}

const buscarLibros = async (req, res) => {
    const { titulo, autor } = req.query;
    const data = {
        titulo,
        autor,
    }
    const libro = await usuarioService.buscarLibro(data);
    try {
        res.status(libro?.code).json(libro);
    } catch (error) {
        res.status(libro?.code).json(libro);
    }
}

const prestarLibro = async (req, res) => {
    const { libroId, usuarioId, fechaDevolucion } = req.body;
    const data = {
        libroId,
        usuarioId,
        fechaDevolucion
    }
    const resultado = await usuarioService.prestarLibro(data);
    console.log(resultado);
    try {
        res.status(resultado?.code).json(resultado);
    } catch (error) {
        res.status(resultado?.code).json(resultado);
    }
}

const devolverLibro = async (req, res) => {
    const { libroId, usuarioId } = req.body;
    const data ={
        libroId,
        usuarioId
    }

    try {
        const resultado = await usuarioService.devolverLibro(data);
        res.status(resultado.code).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al devolver el libro' });
    }
}

module.exports = {
    buscarLibros,
    prestarLibro,
    devolverLibro,
    creationUsuario
}