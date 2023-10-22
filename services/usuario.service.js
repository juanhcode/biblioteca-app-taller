const Libro = require('../database/models/Libro');
const UsuarioPrestamo = require('../database/models/UserPrestamo')
const Usuario = require('../database/models/Usuario');

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
    const { libroId, usuarioId } = data;
    /*
    const prestamoExistente = await UsuarioPrestamo.findOne({
        where: {
            id_libro: libroId,
            devuelto: false
        }
    })*/
    console.log(prestamoExistente);
    
    return { message:"Hola"}

    /*
    
    try {
        const prestamoExistente = await UsuarioPrestamo.findOne({
            where: {
                id_libro: libroId,
                devuelto: false
            }
        })

        if (!prestamoExistente) {
            return {
                message: 'El libro no está disponible para préstamo',
                code: 400
            }
        }   // Registra el préstamo en la tabla de UserPrestamo
        await UserPrestamo.create({
            fecha_prestamo: new Date(),
            devuelto: false,
            id_usuario: usuarioId,
            id_libro: libroId,
        });
        return { message: 'El libro se ha prestado exitosamente', code: 200 };
    } catch (error) {
        return { message: 'Error al prestar el libro', code: 500 };
    }
    */
}

const validacionNombreUsuario = async (nombreUsuario) => {
    const existeNombreUsuario = await Usuario.findOne({
        where:{
            nombre_usuario: nombreUsuario
        }
    })
    return existeNombreUsuario;
}

const validacionUsuarioId = async (id) => {
    const existeUsuarioId = await Usuario.findByPk(id)
    return existeUsuarioId;
}

module.exports = {
    buscarLibro,
    prestarLibro,
    validacionNombreUsuario,
    validacionUsuarioId
}

