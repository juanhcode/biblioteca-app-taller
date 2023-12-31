const Libro = require('../database/models/Libro');
const UsuarioPrestamo = require('../database/models/UserPrestamo')
const Usuario = require('../database/models/Usuario');
const bcrypt = require('bcrypt');

const createUsuario = async (newUsuario)=> {
    const usuarioCreated = new Usuario(newUsuario);
    const salt = bcrypt.genSaltSync();
    usuarioCreated.contrasenia = bcrypt.hashSync(newUsuario.contrasenia, salt);
    await usuarioCreated.save();
    return usuarioCreated;
}


const buscarLibro = async (data) => {
    const { autor, titulo } = data;
    try {
        let libros;
        if (titulo && autor) {
            libros = await Libro.findAll({
                where: {
                    titulo,
                    autor,
                },
            });
        } else if (titulo) {
            libros = await Libro.findAll({
                where: {
                    titulo,
                },
            })
        } else if (autor) {
            libros = await Libro.findAll({
                where: {
                    autor,
                },
            })
        } else {
            return {
                message: 'Debes proporcionar al menos un parámetro de búsqueda (titulo o autor)',
                code: 400
            }
        }
        if (libros.length == 0) {
            return {
                message: 'Error al buscar libros',
                code: 500
            }
        }
        return {
            libro: libros,
            code: 200
        }
    } catch (error) {
        return {
            message: 'Error al buscar libros',
            code: 500
        }
    }
}


const prestarLibro = async (data) => {
    const { libroId, usuarioId, fechaDevolucion } = data;

    try {
        const prestamoExistente = await UsuarioPrestamo.findOne({
            where: {
                id_libro: libroId,
                devuelto: false
            }
        })
        const existeLibro = await Libro.findByPk(libroId);
        if (prestamoExistente || !existeLibro) {
            return {
                message: 'El libro no está disponible para préstamo',
                code: 400
            }
        }   // Registra el préstamo en la tabla de UserPrestamo

        let parts = fechaDevolucion.split("/");
        let year = parseInt(parts[0]);
        let month = parseInt(parts[1]) - 1;
        let day = parseInt(parts[2]);
        await UsuarioPrestamo.create({
            fecha_prestamo: new Date(),
            fecha_devolucion: new Date(year, month, day),
            devuelto: false,
            id_usuario: usuarioId,
            id_libro: libroId,
        });
        return { message: 'El libro se ha prestado exitosamente', code: 200 };
    } catch (error) {
        return { message: 'Error al prestar el libro', code: 500 };
    }

}

const validacionNombreUsuario = async (nombreUsuario) => {
    const existeNombreUsuario = await Usuario.findOne({
        where: {
            nombre_usuario: nombreUsuario
        }
    })
    return existeNombreUsuario;
}

const validacionUsuarioId = async (id) => {
    const existeUsuarioId = await Usuario.findByPk(id)
    return existeUsuarioId;
}

const devolverLibro = async (data) => {
    const { libroId, usuarioId } = data;
    if (!libroId) {
        return { message: 'Se requiere el ID del libro para la devolución', code: 400 };
    }

    if (!usuarioId) {
        return { message: 'Se requiere el ID del usuario para la devolución', code: 400 };
    }

    try {

        const libroPrestado = await UsuarioPrestamo.findOne({ where: { id_libro: libroId, id_usuario: usuarioId, devuelto: false } });
        if (!libroPrestado) {
            return { message: 'El libro no puede ser devuelto (no está prestado por este usuario)', code: 400 };
        }
        await UsuarioPrestamo.update(
            { devuelto: true },
            { where: { id_libro: libroId, id_usuario: usuarioId } }
        );
        return { message: 'El libro se ha devuelto exitosamente', code: 200 };
    } catch (error) {
        return { message: 'Error al devolver el libro', code: 500 };
    }
}

module.exports = {
    createUsuario,
    buscarLibro,
    prestarLibro,
    validacionNombreUsuario,
    validacionUsuarioId,
    devolverLibro
}

