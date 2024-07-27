import { Knex } from 'knex';

require('dotenv').config({ path: '.env.local' });

const extension = process.env.NODE_CONFIG_ENV === 'prod' ? 'js' : 'ts';

module.exports = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: [
      './src/database/migrations',
    ],
    loadExtensions: [`.${extension}`],
  },
  seeds: {
    extension: extension,
    loadExtensions: [`.${extension}`],
    directory: ['./src/database/seeds'],
  }
} as Knex.Config;
