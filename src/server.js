const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
const hbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
})
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({ extended: false }));

//Variables Globales


//Rutas
app.get('/', (req, res) => {
    res.render('index')
});

//Archivos Estáticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;