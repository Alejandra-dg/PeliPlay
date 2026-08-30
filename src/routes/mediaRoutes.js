const express = require('express');
const router = express.Router();
const mediaController = require('../controller/mediaController');

router.get('/listarMedia', mediaController.listar);
router.post('/crearMedia', mediaController.crear);
router.put('/actualizarMedia/:id', mediaController.actualizar);
router.delete('/eliminarMedia/:id', mediaController.eliminar);

module.exports = router;
