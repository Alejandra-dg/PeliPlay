const Director = require('../models/directores');

const listarDirectores = async () => {
    return await Director.findAll();
};

const obtenerDirectorPorId = async (id) => {
    return await Director.findByPk(id);
};

const crearDirector = async (datos) => {
    return await Director.create(datos);
};

const actualizarDirector = async (id, datos) => {
    const director = await Director.findByPk(id);
    if (!director) return null;
    return await director.update(datos);
};

const eliminarDirector = async (id) => {
    const director = await Director.findByPk(id);
    if (!director) return null;
    await director.destroy();
    return true;
};

module.exports = {
    listarDirectores,
    obtenerDirectorPorId,
    crearDirector,
    actualizarDirector,
    eliminarDirector
};
