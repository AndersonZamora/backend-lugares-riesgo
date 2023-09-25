const { modelPlaces } = require('../models/modelPlaces');

const queriePlaces = (model = modelPlaces, id) => {

    const { detalle, direccion, barrio, longitud, latitud, nivel } = model;

    const listarLugares = 'call Sp_Lista_Lugares()';
    const crearLugar = `call Sp_Registrar_Lugares('${detalle}', '${direccion}', '${barrio}', '${longitud}','${latitud}', '${nivel}')`;
    const actualizarLugar = `call Sp_Actualizar_Lugares(${id}, '${detalle}', '${direccion}', '${barrio}', '${longitud}','${latitud}', '${nivel}')`;
    const eliminarLugar = `call Sp_Eliminar_Lugares(${id})`;

    return {
        listarLugares,
        crearLugar,
        actualizarLugar,
        eliminarLugar,
    }
}

module.exports = {
    queriePlaces
}