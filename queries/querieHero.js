const { modelHero } = require('../models/modelHero');

const querieHero = (model = modelHero, id) => {

    const { nombres, apellidos, celular, correo, contrasenia } = model;

    const crearHero = `call Sp_Registrar_Central('${nombres}', '${apellidos}', '${celular}', '${correo}', '${contrasenia}')`;
    const actualizarHero = `call Sp_Actualizar_Central(${id}, '${nombres}', '${apellidos}', '${celular}')`;
    const contraHero = `call Sp_Contra_Central(${id}, '${contrasenia}')`;
    const loginHero = `call Sp_Login_Central('${correo}')`

    return {
        crearHero,
        actualizarHero,
        contraHero,
        loginHero,
    }
}

module.exports = {
    querieHero
}