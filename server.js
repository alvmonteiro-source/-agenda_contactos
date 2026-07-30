const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0';

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

var server = http.createServer(function(req, res) {
    var url = req.url === '/' ? '/login.html' : req.url;
    url = url.split('?')[0];
    var filePath = path.join(__dirname, url);
    var ext = path.extname(filePath).toLowerCase();
    var contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 - Pagina nao encontrada</h1>');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, HOST, function() {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var ips = [];
    for (var name in interfaces) {
        var nets = interfaces[name];
        for (var i = 0; i < nets.length; i++) {
            if (nets[i].family === 'IPv4' && !nets[i].internal) {
                ips.push(nets[i].address);
            }
        }
    }
    console.log('===========================================');
    console.log('   AGENDA DE CONTACTOS - Servidor Ativo');
    console.log('===========================================');
    console.log('');
    console.log('A aceder localmente:');
    console.log('  http://localhost:' + PORT);
    console.log('');
    if (ips.length > 0) {
        console.log('Outros computadores na rede podem aceder:');
        ips.forEach(function(ip) {
            console.log('  http://' + ip + ':' + PORT);
        });
    }
    console.log('');
    console.log('Prima Ctrl+C para parar o servidor.');
});
