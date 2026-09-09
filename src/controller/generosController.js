const generoService = require('../services/generoService');
const Media = require('../models/media');

// Obtener todos los géneros
const listar = async (req, res) => {
    try {
        const generos = await generoService.listarGeneros();
        res.status(200).json({
            success: true,
            data: generos
        });
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los géneros de la base de datos',
            error: error.message
        });
    }
};

// Registrar un nuevo género
const crear = async (req, res) => {
    const { nombre, descripcion, estado } = req.body || {};

    if (!nombre) {
        return res.status(400).json({
            success: false,
            message: 'El campo "nombre" es obligatorio'
        });
    }

    try {
        const nuevoGenero = await generoService.crearGenero({
            nombre,
            descripcion,
            estado: estado || 'Activo'
        });

        res.status(201).json({
            success: true,
            message: 'Género registrado en la base de datos correctamente',
            data: nuevoGenero
        });
    } catch (error) {
        console.error('Error al registrar género:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar el género en la base de datos',
            error: error.message
        });
    }
};

// Actualizar un género existente
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
        const generoActualizado = await generoService.actualizarGenero(id, {
            nombre,
            descripcion,
            estado
        });

        if (!generoActualizado) {
            return res.status(404).json({
                success: false,
                message: `El género con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Género actualizado en la base de datos correctamente',
            data: generoActualizado
        });
    } catch (error) {
        console.error('Error al actualizar género:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el género en la base de datos',
            error: error.message
        });
    }
};

// Eliminar un género existente
const eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si existen producciones asociadas a este género antes de eliminar
        const asociados = await Media.count({ where: { genero_id: id } });
        if (asociados > 0) {
            return res.status(409).json({
                success: false,
                message: `No es posible eliminar este género porque está asociado a ${asociados} producción(es) multimedia. Debes reasignar o eliminar esas producciones primero.`
            });
        }

        const eliminado = await generoService.eliminarGenero(id);

        if (!eliminado) {
            return res.status(404).json({
                success: false,
                message: `El género con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Género eliminado de la base de datos correctamente'
        });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'No es posible eliminar este género porque está referenciado por producciones multimedia existentes.',
                error: error.message
            });
        }
        console.error('Error al eliminar género:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el género en la base de datos',
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