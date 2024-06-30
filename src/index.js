require('dotenv').config();
const app = require('./server');
require('./database/db');

app.listen(app.get('port'), () =>{
    console.log("Servidor inicializado en el puerto ", app.get('port'));
});