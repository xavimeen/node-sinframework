const {responseOk, reponseError} = require('../helper/response');
const bodyParser = require('../lib/bodyParser');

let database = []

class tasktController {

    getTaskHandler = function(req, res) {
        responseOk(res, JSON.stringify(database));
    }
    
    createTaskHandler = async function(req, res) {
        try {
            await bodyParser(req);
            database.push(req.body);
            responseOk(res, JSON.stringify(database));
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write('Invalid Body Data was provided', error.message);
            res.end();
        }
    }

    updateTaksHandler = async function(req, res) {
        try {
            let {url} = req;
    
            let idQuery = url.split("?")[1];
            let idKey = idQuery.split("=")[0];
            let idValue = idQuery.split("=")[1];
    
            if(idKey === 'id') {
                await bodyParser(req);
                database[idValue - 1] = req.body;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(database));
                res.end();
                // responseOk(res, JSON.stringify(database));
            } else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write('Invalid Request Query');
                res.end();
            }
    
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write('Invalid Body Data was provided', error.message);
            res.end();
        }
    }

    deleteTaksHandler = async function(req, res) {
        try {
            let {url} = req;
    
            let idQuery = url.split("?")[1];
            let idKey = idQuery.split("=")[0];
            let idValue = idQuery.split("=")[1];
    
            if(idKey === 'id') {
                database.splice(idValue - 1, 1);
                responseOk(res, {message: 'Deleted successfully'})
            } else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write('Invalid Request Query');
                res.end();
            }
    
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write('Invalid Query', error.message);
            res.end();
        }
    }

}

module.exports = new tasktController();