const Tipo = require('../models/tipos');

const listarTipos = async () => {
    return await Tipo.findAll();
};

const obtenerTipoPorId = async (id) => {
    return await Tipo.findByPk(id);
};

const crearTipo = async (datos) => {
    return await Tipo.create(datos);
};

const actualizarTipo = async (id, datos) => {
    const tipo = await Tipo.findByPk(id);
    if (!tipo) return null;
    return await tipo.update(datos);
};

const eliminarTipo = async (id) => {
    const tipo = await Tipo.findByPk(id);
    if (!tipo) return null;
    await tipo.destroy();
    return true;
};

module.exports = {
    listarTipos,
    obtenerTipoPorId,
    crearTipo,
    actualizarTipo,
    eliminarTipo
};
