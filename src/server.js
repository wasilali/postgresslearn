const fastify = require('fastify')();
const dbConnector = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const errorHandler = require('./utils/errorHandler.js');
const jwt = require('fastify-jwt');

async function startServer() {
  try {
    await fastify.register(jwt, { secret: 'supersecret', decode: { complete: true }, expiresIn: '1h' });
    await fastify.register(authRoutes);
    await fastify.register(dbConnector);
    await fastify.listen({ port: 3000 });
    console.log('Server started successfully');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

fastify.setErrorHandler(errorHandler);
startServer();
