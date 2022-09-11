require('dotenv').config();
const { attachPaginate } = require('knex-paginate');
attachPaginate();

const db = require('knex')({
  client: 'pg',
  connection: {
    port: 5432,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  }
});

module.exports = db;