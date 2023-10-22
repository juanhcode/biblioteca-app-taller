const usuarioService = require('../services/usuario.service');


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
    const { libroId, usuarioId } = req.body;
    const data = {
        libroId,
        usuarioId,
    }
    const resultado = await usuarioService.prestarLibro(data);
    try {     
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al prestar el libro' });
    }
}

module.exports = {
    buscarLibros,
    prestarLibro
}