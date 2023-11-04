const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');

class Server {
    constructor() {

        this.app = express();

        this.port = process.env.PORT;

        this.server = http.createServer(this.app);

        this.io = socketio(this.server, {});
    }

    middlewares() {

        // app.get('*', (req, res) => {
        //     res.sendFile(__dirname + '/public/index.html')
        // })
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(myConnection(mysql, {
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASS,
            database: process.env.DB,
        }, 'single'))

        this.app.use('/no-roguin-to-toroku', require('../routes/rAll'));
        this.app.use('/kanrisha', require('../routes/rAdmin'));
        this.app.use('/shimin', require('../routes/rCitizen'));
        this.app.use('/otoko', require('../routes/rTipo'));
        this.app.use('/basho', require('../routes/rPlaces'));
        this.app.use('/joho', require('../routes/rInfo'));
        this.app.use('/odayakana', require('../routes/rSerene'));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {

        this.middlewares();

        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log(`Servidor correiendo en puerto:${this.port}`);
        })
    }
}

module.exports = Server;
