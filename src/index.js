const http = require('http');

const {
    getTaskHandler,
    createTaskHandler,
    updateTaksHandler,
    deleteTaksHandler } = require('./controllers/task.controller');


const server = http.createServer((req, res) => {
    const {url, method} = req;

    // Logger
    console.log(`URL: ${url} - Method: ${method}`);

    switch (method) {

        case 'GET':
            if(url === "/") {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'Hellou'}));
                res.end();
            }
            if(url === "/tasks") {
                getTaskHandler(req, res);
            }
            break;

        case 'POST':
            if(url === "/tasks") {
                createTaskHandler(req, res);
            }
            break;

        case 'PUT':
            updateTaksHandler(req, res)
            break;

        case 'DELETE':
            deleteTaksHandler(req, res);
            break;

        default:
            break;
    }

});


server.listen(3000);
console.log('Servidor en el puerto:', 3000);