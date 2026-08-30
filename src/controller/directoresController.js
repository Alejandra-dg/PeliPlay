const directorService = require('../services/directorService');

const listar = async (req, res) => {
    try {
        const directores = await directorService.listarDirectores();
        res.status(200).json({
            success: true,
            data: directores
        });
    } catch (error) {
        console.error('Error al obtener directores:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los directores de la base de datos',
            error: error.message
        });
    }
};

const crear = async (req, res) => {
    const { nombre, estado } = req.body || {};

    if (!nombre) {
        return res.status(400).json({
            success: false,
            message: 'El campo "nombre" es obligatorio'
        });
    }

    try {
        const nuevoDirector = await directorService.crearDirector({
            nombre,
            estado: estado || 'Activo'
        });

        res.status(201).json({
            success: true,
            message: 'Director registrado en la base de datos correctamente',
            data: nuevoDirector
        });
    } catch (error) {
        console.error('Error al registrar director:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar el director en la base de datos',
            error: error.message
        });
    }
};

const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body || {};

    if (!nombre) {
        return res.status(400).json({
            success: false,
            message: 'El campo "nombre" es obligatorio'
        });
    }

    try {
        const directorActualizado = await directorService.actualizarDirector(id, {
            nombre,
            estado
        });

        if (!directorActualizado) {
            return res.status(404).json({
                success: false,
                message: `El director con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Director actualizado en la base de datos correctamente',
            data: directorActualizado
        });
    } catch (error) {
        console.error('Error al actualizar director:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el director en la base de datos',
            error: error.message
        });
    }
};

const eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await directorService.eliminarDirector(id);

        if (!eliminado) {
            return res.status(404).json({
                success: false,
                message: `El director con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Director eliminado de la base de datos correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar director:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el director en la base de datos',
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
