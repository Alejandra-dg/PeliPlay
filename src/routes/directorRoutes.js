const express = require('express');
const router = express.Router();
const directoresController = require('../controller/directoresController');

router.get('/listarDirectores', directoresController.listar);
router.post('/crearDirectores', directoresController.crear);
router.put('/actualizarDirectores/:id', directoresController.actualizar);
router.delete('/eliminarDirectores/:id', directoresController.eliminar);

module.exports = router;
