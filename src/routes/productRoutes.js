const { addProduct, getProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

async function productRoutes(fastify, options) {
    fastify.post('/products', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                required: ['name', 'price'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' }
                }
            }
        },
        handler: addProduct
    });

    fastify.get('/products', getProducts);
    
    fastify.get('/products/:id', getSingleProduct);
    
    fastify.put('/products/:id', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                required: ['name', 'price'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' }
                }
            }
        },
        handler: updateSingleProduct
    });
    
    fastify.delete('/products/:id', { preHandler: authMiddleware }, deleteSingleProduct);
}

module.exports = productRoutes;
