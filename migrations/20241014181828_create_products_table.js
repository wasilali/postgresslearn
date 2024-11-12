exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.decimal('price', 10, 2).notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
};
