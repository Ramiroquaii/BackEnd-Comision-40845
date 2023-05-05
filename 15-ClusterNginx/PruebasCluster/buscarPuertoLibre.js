const net = require('net');

function findAvailablePort(ports, callback) {
    let portIndex = 0;
    function tryPort() {
        if (portIndex >= ports.length) {
            callback(new Error('No available ports found'));
            return;
        }
        const port = ports[portIndex];
        const server = net.createServer();
        server.listen(port, () => {
            server.close(() => {
                callback(null, port);
            });
        });
        server.on('error', () => {
            portIndex++;
            tryPort();
        });
    }
    tryPort();
}


const portsToTry = [8082, 8083, 8084, 8085];

findAvailablePort(portsToTry, (err, port) => {
    if (err) {
        console.log(`No hay puertos libres en el rango ${portsToTry}`);
    } else {
        console.log(`Primer puerto libre del rango: ${port}`)
    }
});