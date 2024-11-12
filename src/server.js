const fastify = require('fastify')();
const dbConnector = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const errorHandler = require('./utils/errorHandler.js');
const dotenv = require('dotenv');
const jwt = require('fastify-jwt');

dotenv.config();

async function startServer() {
  try {

    await fastify.register(jwt, { secret: process.env.JWT_SECRET, decode: { complete: true }, expiresIn: process.env.JWT_EXPIRES_IN });
    await fastify.register(authRoutes);
    await fastify.register(productRoutes);
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
