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
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al devolver el libro' });
    }
}

module.exports = {
    buscarLibros,
    prestarLibro,
    devolverLibro
}