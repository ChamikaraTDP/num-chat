import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("user_id").primary();
      table.string("username", 16).unique();
      table.string("password", 256);
      table.dateTime("createdDate").defaultTo(knex.fn.now());
    })
    .createTable("post", (table) => {
      table.increments("post_id").primary();
      table.double("value");
      table
        .integer("owner_id")
        .unsigned()
        .references("user_id")
        .inTable("user")
        .onDelete("SET NULL")
        .index();
      table
        .integer("parent_post_id")
        .unsigned()
        .references("post_id")
        .inTable("post")
        .onDelete("CASCADE")
        .index();
      table.string("operand", 1);
      table.double("input");
      table.dateTime("createdDate").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("user")
    .dropTableIfExists("post")
    .dropTableIfExists("post_reply");
}
