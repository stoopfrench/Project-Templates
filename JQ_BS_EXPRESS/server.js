const express = require('express');
// const request = require('request');
// const HTTP = require('http');
// const HTTPS = require('https');
// const fs = require('fs');

// const secrets = require('./secrets.js');

const app = express();

app.use(express.static('./public'));

//FILES =========================================

app.get('/', (req, res) => {

    res.sendFile('./public/html/index.html', { root: './' });
});

//REQUESTS ======================================

//EXPRESS SERVER --------------------------------

let port = 8080;

app.listen(port, () => {

    console.log('... running on ', port);
});


//HTTP/HTTPS Server -----------------------------
var httpsKey = secrets.httpsKey
var httpsCert = secrets.httpsCert

try {
    var httpsConfig = {

        key: fs.readFileSync(httpsKey),
        cert: fs.readFileSync(httpsCert),
    }

    var httpsServer = HTTPS.createServer(httpsConfig, app)

    httpsServer.listen(443)

    var httpApp = express()

    httpApp.use(function(req, res, next){

        res.redirect('https://example.com' + req.url)
    })

    httpApp.listen(80)
}
catch(e){

    console.log(e)

    console.log('could not start HTTPS server')

    var httpServer = HTTP.createServer(app)

    httpServer.listen(80)
}
