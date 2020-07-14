class Response {

    responseOk = (res, data) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        res.end();
    }
    
    reponseError= (res, status, message, err = null) => {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write(message, err);
        res.end();
    }

}

module.exports = new Response();