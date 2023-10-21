const Libro = require('../database/models/Libro');

const createBook = async (newBook) => {
    const bookCreate = await Libro.create(newBook);
    return bookCreate;
}

const deleteBook = async (id) => {
    const bookDeleted = await book.destroy();
    return bookDeleted;
}

const validationBookExistsById = async (id) => {
    const book = await Libro.findByPk(id);
    return book
}

const validationBookExistsByTitle = async (title) => {
    const bookExists = await Libro.findOne({
        where: {titulo: title}
    });

    return bookExists
}

module.exports = {
    createBook,
    deleteBook,
    validationBookExistsById,
    validationBookExistsByTitle
}