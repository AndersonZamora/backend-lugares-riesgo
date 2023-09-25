const Server = require('./models/server');

require('dotenv').config();


const server = new Server();

server.execute();
// // TODO: Crear el servidor
// const app = express();

// // TODO: Base de datos
// cnn();

// // TODO: CORS
// app.use(cors());

// // TODO :Directorio publico
// app.use(express.static('public'));

// // TODO: Lectura y parceo del body
// app.use(express.json());

// app.use('/hero', require('./routes/rHero'));
// app.use('/no-roguin-to-toroku', require('./routes/rAll'));
// app.use('/kanrisha', require('./routes/rAdmin'));
// app.use('/shimin', require('./routes/rCitizen'));
// app.use('/otoko', require('./routes/rTipo'));
// app.use('/basho', require('./routes/rPlaces'));
// app.use('/joho', require('./routes/rInfo'));
// app.use('/odayakana', require('./routes/rSerene'));

// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })
// // TODO: Escuchar peticiones
// const PORT = process.env.PORT || 4000
// app.listen(PORT, () => {
//     console.log(`Servidor correiendo en puerto ${PORT}`)
// });