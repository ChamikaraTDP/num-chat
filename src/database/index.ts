import knex from "knex";

let cached = global.pg;
if (!cached) cached = global.pg = {};

export function getKnex() {
  if (!cached.instance)
    cached.instance = knex({
      client: "pg",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      },
    });
  return cached.instance;
}
