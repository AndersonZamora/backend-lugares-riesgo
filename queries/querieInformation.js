const { modelInformation } = require('../models/modelInformation');

const querieInformation = (model = modelInformation, id) => {

    const { datos, link, fecha } = model;

    const listarInfo = 'call Sp_Lista_Information()';
    const crearInfo = `call Sp_Registrar_Information('${datos}', '${link}', '${fecha}')`;
    const eliminarInfo = `call Sp_Eliminar_Information(${id})`;

    return {
        listarInfo,
        crearInfo,
        eliminarInfo
    }
}

module.exports = {
    querieInformation
}