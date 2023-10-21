const Libro = require('../database/models/Libro');

const createBook = async (newBook) => {
    const bookExists = await Libro.findOne({
        where: {titulo: newBook.titulo}
    });

    if (bookExists) {
        print('Este libro ya esta en la base de datos')
    }

    const bookCreate = await Libro.create(newBook);
    return bookCreate;
}

const deleteBook = async (id) => {
    const book = await Libro.findByPk(id);

    if (!book) {
        print('No se puede eliminar, el libro no existe')
    }

    const bookDeleted = await book.destroy();
    return bookDeleted;
}

module.exports = {
    createBook,
    deleteBook
}