const Media = require('../models/media');
const Genero = require('../models/generos');
const Director = require('../models/directores');
const Productora = require('../models/productoras');
const Tipo = require('../models/tipos');

const associations = [
    { model: Genero, as: 'genero', attributes: ['id', 'nombre', 'estado'] },
    { model: Director, as: 'director', attributes: ['id', 'nombre', 'estado'] },
    { model: Productora, as: 'productora', attributes: ['id', 'nombre', 'estado'] },
    { model: Tipo, as: 'tipo', attributes: ['id', 'nombre', 'estado'] }
];

const listarMedia = async () => {
    return await Media.findAll({
        include: associations
    });
};

const obtenerMediaPorId = async (id) => {
    return await Media.findByPk(id, {
        include: associations
    });
};

const crearMedia = async (datos) => {
    const nuevaMedia = await Media.create(datos);
    // Retornar con las relaciones cargadas
    return await obtenerMediaPorId(nuevaMedia.id);
};

const actualizarMedia = async (id, datos) => {
    const media = await Media.findByPk(id);
    if (!media) return null;
    await media.update(datos);
    // Retornar con las relaciones cargadas
    return await obtenerMediaPorId(id);
};

const eliminarMedia = async (id) => {
    const media = await Media.findByPk(id);
    if (!media) return null;
    await media.destroy();
    return true;
};

module.exports = {
    listarMedia,
    obtenerMediaPorId,
    crearMedia,
    actualizarMedia,
    eliminarMedia
};
