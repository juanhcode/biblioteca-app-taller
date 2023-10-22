const {Router} = require('express');
const router = Router();
const usuarioController = require('../../controllers/usuario.controller');
router.get('/find', usuarioController.buscarLibros);
router.post('/prestar-libro',usuarioController.prestarLibro);
module.exports = router;
