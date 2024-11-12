async function dbConnector(fastify, options) {
    
    const { Client } = require('pg');
    const client = new Client({
        connectionString: process.env.POSTGRES_DB_URL,
    });
    try {
        await client.connect();
        fastify.log.info('Database connected successfully');
        fastify.decorate('pg', client);
    } catch (err) {
        fastify.log.error('Failed to connect to database:', err);
        throw err;
    }
}

module.exports = dbConnector;