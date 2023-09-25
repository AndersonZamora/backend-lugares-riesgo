const { comprobarJWT } = require('../helpers/jwt');

const { querieAlert } = require('../queries/querieAlert');
const { main } = require('../database/config');
const { querieConectado } = require('../queries/querieConectado');
const { querieSerene } = require('../queries/querieSerene');

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        try {

            this.io.on('connection', async (socket) => {

                const [valido, uid, role] = comprobarJWT(socket.handshake.query['x-token']);

                if (!valido) {
                    console.log('socket no identificado');
                    return socket.disconnect();
                }

                const { connection } = await main();

                switch (role) {
                    case 'ciuda':
                        socket.join(uid)
                        const { citizenConectado } = querieConectado(uid, true);
                        const [Result] = await connection.execute(citizenConectado);

                        if (Result.affectedRows <= 0) return socket.disconnect();

                        break;
                    case 'seren':

                        socket.join(uid);
                        const { sereneConectado } = querieConectado(uid, true);
                        const [Result2] = await connection.execute(sereneConectado);

                        if (Result2.affectedRows <= 0) return socket.disconnect();

                        break;
                    default:
                        break;
                }

                // TODO: Escuchar cuando el citizeb manda una denuncia
                socket.on('denuncia', async (payload) => {

                    try {

                        const [fields] = await connection.execute(`SELECT * FROM serene where onlin = ${true}`);

                        const { obtenerAlertas } = querieSerene();

                        const [data] = await connection.execute(obtenerAlertas);

                        const lisAlerts = data[0];

                        if (fields.length > 0) {
                            const arregl = fields.map(function (data) { return data.Id })
                            socket.to(arregl).emit('lista-alertas', lisAlerts);
                        }

                        // this.io.to(uid).emit('denuncia', { estado: true, msg: 'se emitieron todas las alertas a los serenos' });

                    } catch (error) {
                        this.io.to(uid).emit('denuncia', { estado: false, msg: 'no se pudo enviar' });
                    }

                });

                socket.on('disconnect', async () => {

                    console.log('usuario desconectado');

                    switch (role) {
                        case 'ciuda':

                            const { citizenConectado } = querieConectado(uid, false);
                            const [Result] = await connection.execute(citizenConectado);

                            if (Result.affectedRows <= 0) return socket.disconnect();

                            break;
                        case 'seren':

                            socket.join(uid);
                            const { sereneConectado } = querieConectado(uid, false);
                            const [Result2] = await connection.execute(sereneConectado);

                            if (Result2.affectedRows <= 0) return socket.disconnect();

                            break;
                        default:
                            break;
                    }

                });

            });
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = Sockets;