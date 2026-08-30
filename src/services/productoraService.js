const Productora = require('../models/productoras');

const listarProductoras = async () => {
    return await Productora.findAll();
};

const obtenerProductoraPorId = async (id) => {
    return await Productora.findByPk(id);
};

const crearProductora = async (datos) => {
    return await Productora.create(datos);
};

const actualizarProductora = async (id, datos) => {
    const productora = await Productora.findByPk(id);
    if (!productora) return null;
    return await productora.update(datos);
};

const eliminarProductora = async (id) => {
    const productora = await Productora.findByPk(id);
    if (!productora) return null;
    await productora.destroy();
    return true;
};

module.exports = {
    listarProductoras,
    obtenerProductoraPorId,
    crearProductora,
    actualizarProductora,
    eliminarProductora
};
