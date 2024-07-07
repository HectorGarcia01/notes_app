require('dotenv').config();
const app = require('./server');
require('./database/db');
const https = require('https');
const path = require('path');
const fs = require('fs');

const sslPath = path.join(__dirname, 'utils/ssl');

https.createServer({
    cert: fs.readFileSync(path.join(sslPath, 'server.cer')),
    key: fs.readFileSync(path.join(sslPath, 'server.key'))
}, app).listen(app.get('port'), () =>{
    console.log("Servidor inicializado en el puerto ", app.get('port'));
});