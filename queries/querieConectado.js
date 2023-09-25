
const querieConectado = (uid = 0, estado = false) => {

    const citizenConectado = `call Sp_Citizen_Conectado(${uid}, ${estado})`

    const sereneConectado = `call Sp_Serene_Conectado(${uid}, ${estado});`

    return {
        citizenConectado,
        sereneConectado
    }
}

module.exports = {
    querieConectado,
}