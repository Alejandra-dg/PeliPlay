const productoraService = require('../services/productoraService');

const listar = async (req, res) => {
    try {
        const productoras = await productoraService.listarProductoras();
        res.status(200).json({
            success: true,
            data: productoras
        });
    } catch (error) {
        console.error('Error al obtener productoras:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las productoras de la base de datos',
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
        const nuevaProductora = await productoraService.crearProductora({
            nombre,
            descripcion,
            estado: estado || 'Activo'
        });

        res.status(201).json({
            success: true,
            message: 'Productora registrada en la base de datos correctamente',
            data: nuevaProductora
        });
    } catch (error) {
        console.error('Error al registrar productora:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar la productora en la base de datos',
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
        const productoraActualizada = await productoraService.actualizarProductora(id, {
            nombre,
            descripcion,
            estado
        });

        if (!productoraActualizada) {
            return res.status(404).json({
                success: false,
                message: `La productora con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Productora actualizada en la base de datos correctamente',
            data: productoraActualizada
        });
    } catch (error) {
        console.error('Error al actualizar productora:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la productora en la base de datos',
            error: error.message
        });
    }
};

const eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminada = await productoraService.eliminarProductora(id);

        if (!eliminada) {
            return res.status(404).json({
                success: false,
                message: `La productora con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Productora eliminada de la base de datos correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar productora:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la productora en la base de datos',
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
