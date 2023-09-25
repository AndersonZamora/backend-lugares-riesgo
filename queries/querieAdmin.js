const { modelSerene } = require("../models/modelSerene");

const querieAdmin = (id = 0, ser = modelSerene) => {

    const listaUsuarios = `call Sp_Lista_Citizen()`;
    const eliminarUsuario = `call Sp_Eliminar_Citizen(${id})`;

    const listarSerenos = `call Sp_Lista_Serene()`;
    const registrarSereno = `call Sp_Registrar_Serene('${ser.nombres}', '${ser.apellidos}', '${ser.celular}', '${ser.correo}', '${ser.contrasenia}')`;
    const eliminarSereno = `call Sp_Eliminar_Serene(${id})`;
    const obtenerSereno = `call Sp_Obtener_Citizen(${id})`;
    const valSerene = `call Sp_ValSerene('${ser.correo}','${ser.celular}')`;

    return {
        listaUsuarios,
        eliminarUsuario,
        listarSerenos,
        registrarSereno,
        eliminarSereno,
        obtenerSereno,
        valSerene,
    }
}

module.exports = {
    querieAdmin
}