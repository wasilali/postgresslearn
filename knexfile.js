module.exports = {
  client: 'pg',
  connection: 'postgres://postgres:wasil@localhost:5432/testbase',
  migrations: {
      tableName: 'knex_migrations',
  },
};