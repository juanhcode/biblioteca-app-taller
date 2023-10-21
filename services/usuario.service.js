const Libro = require('../database/models/Libro');
const Usuario = require('../database/models/User');

const buscarLibro = async (data)=>{
    const {author,titulo} = data;
    try {
        let libros;
        if(titulo && author){
            libros = await Libro.findAll({
                where:{
                    titulo,
                    autor:author,
                },
            });
        }else if(titulo){
            libros = await Libro.findAll({
                where:{
                    titulo,
                },
            })
        }else if(author){
            libros = await Libro.findAll({
                where:{
                    autor:author,
                },
            })
        }else{
            return {
                message:'Debes proporcionar al menos un parámetro de búsqueda (titulo o autor)',
                code:400
            }
        }
        return {
            libro:libros,
            code:200
        }
    } catch (error) {
        return {
            message:'Error al buscar libros',
            code:500
        }
    }
}

module.exports={
    buscarLibro,
}