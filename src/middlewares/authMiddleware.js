async function authMiddleware(req, reply) {
    try {
        if (!req.headers.authorization) {
            throw new Error('No token provided');
        }
        await req.jwtVerify();
    } catch (err) {
        console.error('JWT Verification failed:', err.message);
        reply.code(401).send({ error: 'Unauthorized: ' + err.message });
    }
}

module.exports = authMiddleware;