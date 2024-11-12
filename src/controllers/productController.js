const { Pool } = require('pg');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../models/productModel');

const pool = new Pool({
    connectionString: process.env.POSTGRES_DB_URL,
});

async function addProduct(req, reply) {
    const productData = {
        ...req.body,
        user_id: req.user.id
    };
    const product = await createProduct(pool, productData);
    reply.code(201).send(product);
}

async function getProducts(req, reply) {
    const products = await getAllProducts(pool);
    reply.send(products);
}

async function getSingleProduct(req, reply) {
    const product = await getProductById(pool, req.params.id);
    if (!product) {
        return reply.code(404).send({ message: 'Product not found' });
    }
    reply.send(product);
}

async function updateSingleProduct(req, reply) {
    const updates = {
        ...req.body,
        user_id: req.user.id
    };
    const product = await updateProduct(pool, req.params.id, updates);
    if (!product) {
        return reply.code(404).send({ message: 'Product not found or unauthorized' });
    }
    reply.send(product);
}

async function deleteSingleProduct(req, reply) {
    const product = await deleteProduct(pool, req.params.id, req.user.id);
    if (!product) {
        return reply.code(404).send({ message: 'Product not found or unauthorized' });
    }
    reply.send({ message: 'Product deleted successfully' });
}

module.exports = {
    addProduct,
    getProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
};
