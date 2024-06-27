const app = require('./server');

app.listen(app.get('port'), () =>{
    console.log("Servidor inicializado en el puerto ", app.get('port'));
});