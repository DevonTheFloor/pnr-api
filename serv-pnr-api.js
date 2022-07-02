const http = require('http'),
api = require('./api'),
apiPort = 5000,
apiHost = '127.0.0.3' 

api.set('port', apiPort);
const server = http.createServer(api);
server.listen(apiPort, apiHost);
console.log('Pnr API listen port : ' + apiPort + ' on host : '+ apiHost)

