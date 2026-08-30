const express = require('express');
const router = express.Router();
const productorasController = require('../controller/productorasController');

router.get('/listarProductoras', productorasController.listar);
router.post('/crearProductoras', productorasController.crear);
router.put('/actualizarProductoras/:id', productorasController.actualizar);
router.delete('/eliminarProductoras/:id', productorasController.eliminar);

module.exports = router;
