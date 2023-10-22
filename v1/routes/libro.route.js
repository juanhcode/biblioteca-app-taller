const { Router } = require('express');
const router = Router();
const libroController = require('../../controllers/libro.controller')
const checkAuth = require('../../middlewares/auth');
const { esBibliotecario } = require('../../middlewares/verify-rol');


router.post('/', [
    checkAuth,
    esBibliotecario
],libroController.createBook);

router.delete('/:id', [
    checkAuth,
    esBibliotecario
],libroController.deleteBook);

module.exports = router;