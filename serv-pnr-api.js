const http = require('http'),
api = require('./api'),
apiPort = process.env.PNR_API_PORT,
apiHost = process.env.PNR_API_HOSTNAME; 

api.set('port', apiPort);
const server = http.createServer(api);
server.listen(apiPort, apiHost);
console.log('Pnr API listen port : ' + apiPort + ' on host : '+ apiHost)

