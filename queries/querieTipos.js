const { modelTipo } = require('../models/modelTipo');

const querieTipos = (model = modelTipo, id = 0) => {

    const { tipo, numero } = model;

    const listarTipo = 'call Sp_Lista_Tipos()';
    const crearTipo = `call Sp_Registrar_Tipos('${tipo}', '${numero}')`;
    const eliminarTipo = `call Sp_Eliminar_Tipos(${id})`;

    return {
        listarTipo,
        crearTipo,
        eliminarTipo
    }
}

module.exports = {
    querieTipos
}