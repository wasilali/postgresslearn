async function createProduct(pg, { name, description, price, user_id }) {
    const result = await pg.query(
        'INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, user_id]
    );
    return result.rows[0];
}

async function getAllProducts(pg) {
    const result = await pg.query(`
        SELECT 
            products.*,
            json_build_object(
                'id', users.id,
                'name', users.name,
                'email', users.email,
                'created_at', users.created_at,
                'updated_at', users.updated_at
            ) as user
        FROM products 
        LEFT JOIN users ON products.user_id = users.id
        ORDER BY products.created_at DESC
    `);
    return result.rows;
}

async function getProductById(pg, id) {
    const result = await pg.query(`
        SELECT 
            products.*,
            json_build_object(
                'id', users.id,
                'name', users.name,
                'email', users.email,
                'created_at', users.created_at,
                'updated_at', users.updated_at
            ) as user
        FROM products 
        LEFT JOIN users ON products.user_id = users.id
        WHERE products.id = $1
    `, [id]);
    return result.rows[0];
}
async function updateProduct(pg, id, updates) {
    const result = await pg.query(
        'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [updates.name, updates.description, updates.price, id, updates.user_id]
    );
    return result.rows[0];
}

async function deleteProduct(pg, id, user_id) {
    const result = await pg.query('DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *', [id, user_id]);
    return result.rows[0];
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
