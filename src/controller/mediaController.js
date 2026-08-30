const mediaService = require('../services/mediaService');

const listar = async (req, res) => {
    try {
        const mediaList = await mediaService.listarMedia();
        res.status(200).json({
            success: true,
            data: mediaList
        });
    } catch (error) {
        console.error('Error al obtener producciones (media):', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los registros de películas y series de la base de datos',
            error: error.message
        });
    }
};

const crear = async (req, res) => {
    const {
        serial,
        titulo,
        sinopsis,
        url,
        imagen,
        anio_estreno,
        genero_id,
        director_id,
        productora_id,
        tipo_id
    } = req.body || {};

    // Validar campos obligatorios
    if (!serial) {
        return res.status(400).json({ success: false, message: 'El campo "serial" es obligatorio' });
    }
    if (!titulo) {
        return res.status(400).json({ success: false, message: 'El campo "titulo" es obligatorio' });
    }
    if (!genero_id) {
        return res.status(400).json({ success: false, message: 'El campo "genero_id" es obligatorio' });
    }
    if (!director_id) {
        return res.status(400).json({ success: false, message: 'El campo "director_id" es obligatorio' });
    }
    if (!productora_id) {
        return res.status(400).json({ success: false, message: 'El campo "productora_id" es obligatorio' });
    }
    if (!tipo_id) {
        return res.status(400).json({ success: false, message: 'El campo "tipo_id" es obligatorio' });
    }

    try {
        const nuevaMedia = await mediaService.crearMedia({
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno,
            genero_id,
            director_id,
            productora_id,
            tipo_id
        });

        res.status(201).json({
            success: true,
            message: 'Producción (media) registrada en la base de datos correctamente',
            data: nuevaMedia
        });
    } catch (error) {
        console.error('Error al registrar media:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una producción (media) con ese serial o url único',
                error: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al registrar la producción (media) en la base de datos',
            error: error.message
        });
    }
};

const actualizar = async (req, res) => {
    const { id } = req.params;
    const {
        serial,
        titulo,
        sinopsis,
        url,
        imagen,
        anio_estreno,
        genero_id,
        director_id,
        productora_id,
        tipo_id
    } = req.body || {};

    if (!serial || !titulo) {
        return res.status(400).json({
            success: false,
            message: 'Los campos "serial" y "titulo" son obligatorios'
        });
    }

    try {
        const mediaActualizada = await mediaService.actualizarMedia(id, {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno,
            genero_id,
            director_id,
            productora_id,
            tipo_id
        });

        if (!mediaActualizada) {
            return res.status(404).json({
                success: false,
                message: `La producción con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producción (media) actualizada en la base de datos correctamente',
            data: mediaActualizada
        });
    } catch (error) {
        console.error('Error al actualizar media:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una producción (media) con ese serial o url único',
                error: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la producción (media) en la base de datos',
            error: error.message
        });
    }
};

const eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await mediaService.eliminarMedia(id);

        if (!eliminado) {
            return res.status(404).json({
                success: false,
                message: `La producción con ID ${id} no existe en la base de datos`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producción (media) eliminada de la base de datos correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar media:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la producción (media) en la base de datos',
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
