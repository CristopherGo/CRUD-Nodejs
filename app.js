
//importando modulos
const express = require('express');
const connection = require('express-myconnection');
const mysql = require('mysql');
const routes = require('./src/routes/route');
const app = express();

//asignacion de puerto
app.set('port', 4000);

//motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//estableciendo conexion con db
app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'users'
}, 'single'));

app.listen(app.get('port'), () => {
    console.log('server runnning in port: ', app.get('port'));
});

//manejo de rutas
app.use('/', routes);