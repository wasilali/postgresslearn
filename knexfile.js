module.exports = {
  client: 'pg',
  connection: 'postgres://postgres:postgres@localhost:5432/testbase',
  migrations: {
      tableName: 'knex_migrations',
  },
};