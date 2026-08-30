const express = require('express');
const router = express.Router();
const generosController = require('../controller/generosController');

router.get('/listarGeneros', generosController.listar);
router.post('/crearGeneros', generosController.crear);
router.put('/actualizarGeneros/:id', generosController.actualizar);
router.delete('/eliminarGeneros/:id', generosController.eliminar);

module.exports = router;
