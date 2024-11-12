function errorHandler(err, req, reply) {
    console.error(err);

    let statusCode = 500;
    let errorMessage = err.message || 'Internal Server Error';

    if (err.validation) {
        statusCode = 400; 
        errorMessage = 'Validation Error: ' + err.message;
    } else if (err.code === 'NOT_FOUND') {
        statusCode = 404; 
        errorMessage = 'Resource Not Found';
    } else if (err.code === 'UNAUTHORIZED') {
        statusCode = 401; 
        errorMessage = 'Unauthorized Access';
    }

    reply.status(statusCode).send({ error: errorMessage });
}

module.exports = errorHandler;
