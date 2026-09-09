const tipoService = require('../services/tipoService');
const Media = require('../models/media');

const listar = async (req, res) => {
    try {
        const tipos = await tipoService.listarTipos();
        res.status(200).json({
            success: true,
            data: tipos
        });
    } catch (error) {
        console.error('Error al obtener tipos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los tipos de la base de datos',
            error: error.message
        });
    }
};

const crear = async (req, res) => {
    const { nombre, descripcion, estado } = req.body || {};

    if (!nombre) {
        return res.status(400).json({
            success: false,
            message: 'El campo "nombre" es obligatorio'
        });
    }

    try {
        const nuevoTipo = await tipoService.crearTipo({
            nombre,
            descripcion,
            estado: estado || 'Activo'
        });

        res.status(201).json({
            success: true,
            message: 'Tipo registrado en la base de datos correctamente',
            data: nuevoTipo
        });
    } catch (error) {
        console.error('Error al registrar tipo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar el tipo en la base de datos',
            error: error.message
        });
    }
};

const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body || {};

    if (!nombre) {
        return res.status(400).json({
            success: false,
            message: 'El campo "nombre" es obligatorio'
        });
    }

    try {
        const tipoActualizado = await tipoService.actualizarTipo(id, {
            nombre,
            descripcion,
            estado
        });

        if (!tipoActualizado) {
            return res.status(404).json({
                success: false,
                message: `El tipo con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tipo actualizado en la base de datos correctamente',
            data: tipoActualizado
        });
    } catch (error) {
        console.error('Error al actualizar tipo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el tipo en la base de datos',
            error: error.message
        });
    }
};

const eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si existen producciones asociadas a este tipo antes de eliminar
        const asociados = await Media.count({ where: { tipo_id: id } });
        if (asociados > 0) {
            return res.status(409).json({
                success: false,
                message: `No es posible eliminar este tipo porque está asociado a ${asociados} producción(es) multimedia. Debes reasignar o eliminar esas producciones primero.`
            });
        }

        const eliminado = await tipoService.eliminarTipo(id);

        if (!eliminado) {
            return res.status(404).json({
                success: false,
                message: `El tipo con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tipo eliminado de la base de datos correctamente'
        });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'No es posible eliminar este tipo porque está referenciado por producciones multimedia existentes.',
                error: error.message
            });
        }
        console.error('Error al eliminar tipo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el tipo en la base de datos',
            error: error.message
        });
    }
};

module.exports = {
    listar,
    crear,
    actualizar,
    eliminar
};
