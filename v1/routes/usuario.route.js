const {Router} = require('express');
const router = Router();
const usuarioController = require('../../controllers/usuario.controller');
router.post('', usuarioController.creationUsuario);
router.get('/find', usuarioController.buscarLibros);
router.post('/prestar-libro',usuarioController.prestarLibro);
router.post('/devolver-libro',usuarioController.devolverLibro);
module.exports = router;
