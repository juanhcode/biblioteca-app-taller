const libroServices = require('../services/libro.service');

const createBook = async(req, res) => {
    const {body} = req;

    try {
        const createBook = await libroServices.createBook(body);
        res.json(createBook)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const deleteBook = async (req, res) => {

    const {id} = req.params;
    
    await libroServices.deleteBook(id);
    res.json({
        msg: `Rol con el id ${id} ha sido eliminado.`
    });
}

module.exports = {
    createBook,
    deleteBook
}