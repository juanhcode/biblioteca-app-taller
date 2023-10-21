const usuarioService = require('../services/usuario.service');

const buscarLibros = async(req,res)=>{
    const { titulo, autor } = req.query;
    const data = {
        titulo,
        author:autor,
    }
    const libro = await usuarioService.buscarLibro(data);
    console.log(libro);
    try {
        res.json(libro);
    } catch (error) {
        res.json(libro);
    }
}

module.exports={
    buscarLibros,
}