const { comprobarJWT } = require('../helpers/jwt');
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
                        const { Id } = { ...payload };

                        const [fields] = await connection.execute(`SELECT * FROM serene where onlin = ${true}`);

                        if (fields.length > 0) {

                            const { obtenerAlerta } = querieSerene(Id);

                            const [data] = await connection.execute(obtenerAlerta);
                            if (data.length > 0) {
                                const obj = { ...data[0][0] };
                                const arregl = fields.map(function (da) { return da.Id })
                                socket.to(arregl).emit('new-alert', obj);
                            }
                        }

                    } catch (error) {
                        this.io.to(uid).emit('denuncia', { estado: false, msg: 'no se pudo enviar' });
                    }

                });

                socket.on('disconnect', async () => {
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