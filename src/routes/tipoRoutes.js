const express = require('express');
const router = express.Router();
const tiposController = require('../controller/tiposController');

router.get('/listarTipos', tiposController.listar);
router.post('/crearTipos', tiposController.crear);
router.put('/actualizarTipos/:id', tiposController.actualizar);
router.delete('/eliminarTipos/:id', tiposController.eliminar);

module.exports = router;
