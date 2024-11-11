const { register, login, getSingleUser, editPassword, deleteUser } = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

async function authRoutes(fastify, options) {
    fastify.post('/register', {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string', minLength: 6 }
                }
            }
        },
        handler: register
    });

    fastify.post('/login', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        },
        handler: login
    });
    
    // Protected route
    fastify.get('/profile', { preHandler: authMiddleware }, getSingleUser);

    fastify.put('/edit-password', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                required: ['currentPassword', 'newPassword'],
                properties: {
                    currentPassword: { type: 'string' },
                    newPassword: { type: 'string', minLength: 6 }
                }
            }
        },
        handler: editPassword
    });

    fastify.delete('/delete-user', { preHandler: authMiddleware }, deleteUser);
    
}

module.exports = authRoutes;
