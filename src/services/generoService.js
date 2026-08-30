const Genero = require('../models/generos');

const listarGeneros = async () => {
    return await Genero.findAll();
};

const obtenerGeneroPorId = async (id) => {
    return await Genero.findByPk(id);
};

const crearGenero = async (datos) => {
    return await Genero.create(datos);
};

const actualizarGenero = async (id, datos) => {
    const genero = await Genero.findByPk(id);
    if (!genero) return null;
    return await genero.update(datos);
};

const eliminarGenero = async (id) => {
    const genero = await Genero.findByPk(id);
    if (!genero) return null;
    await genero.destroy();
    return true;
};

module.exports = {
    listarGeneros,
    obtenerGeneroPorId,
    crearGenero,
    actualizarGenero,
    eliminarGenero
};