const {Router} = require('express');
const router = Router();
const usuarioController = require('../../controllers/usuario.controller');
router.get('/find', usuarioController.buscarLibros);
module.exports = router;
