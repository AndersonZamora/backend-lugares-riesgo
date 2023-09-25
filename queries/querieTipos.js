const { modelTipo } = require('../models/modelTipo');

const querieTipos = (model = modelTipo, id = 0) => {

    const { tipo, numero } = model;
    console.log(tipo)

    const listarTipo = 'call Sp_Lista_Tipos()';
    const crearTipo = `call Sp_Registrar_Tipos('${tipo}', '${numero}')`;
    const eliminarTipo = `call Sp_Eliminar_Tipos(${id})`;
    const valTipo = `call Sp_ValTipo('${tipo}','${numero}')`;

    return {
        listarTipo,
        crearTipo,
        eliminarTipo,
        valTipo,
    }
}

module.exports = {
    querieTipos
}