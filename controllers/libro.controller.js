const libroServices = require('../services/libro.service');

const createBook = async(req, res) => {
    const {body} = req;

    try {
        const validationTitle = await libroServices.validationBookExistsByTitle(body.titulo);
        if (validationTitle){
            return res.status(400).json({
                msg: 'Ya existe un libro con el titulo ' + body.titulo
            });
        }
        const createBook = await libroServices.createBook(body);
        res.status(200).json(createBook);
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const deleteBook = async (req, res) => {

    const {id} = req.params;

    const bookExists = await libroServices.validationBookExistsById(id)
    if(!bookExists){
        return res.status(404).json({
            msg: `No existe el libro con el id ${id}`
        })
    }
    
    await libroServices.deleteBook(id);
    res.json({
        msg: `Libro con el id ${id} ha sido eliminado.`
    });
}

module.exports = {
    createBook,
    deleteBook
}