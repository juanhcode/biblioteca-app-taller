const { Router } = require('express');
const router = Router();
const libroController = require('../../controllers/libro.controller'

)

router.post('/', libroController.createBook);
router.delete('/:id', libroController.deleteBook);

module.exports = router;