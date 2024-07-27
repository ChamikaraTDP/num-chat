import { Knex } from "knex";
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);

  await knex("user").insert([
    {
      username: "chami",
      password: await bcrypt.hash('abc123', 10),
      createdDate: new Date(),
    },
    {
      username: "shar",
      password: await bcrypt.hash('abc123', 10),
      createdDate: new Date(),
    },
  ]);
  

  await knex("post").insert([
    {
      post_id: 1,
      value: 10,
      owner_id: 1,
      parent_post_id: null,
      operand: 'A',
      input: 10,
    },
    {
      post_id: 2,
      value: 20,
      owner_id: 2,
      parent_post_id: 1,
      operand: 'M',
      input: 2,
    },
    {
      post_id: 3,
      value: 2,
      owner_id: 1,
      parent_post_id: 1,
      operand: 'D',
      input: 5,
    },
    {
      post_id: 4,
      value: 30,
      owner_id: 1,
      parent_post_id: 2,
      operand: 'A',
      input: 10,
    },
    {
      post_id: 5,
      value: 40,
      owner_id: 2,
      parent_post_id: 2,
      operand: 'A',
      input: 20,
    },
  ]);

  await knex.raw(
    `ALTER SEQUENCE "post_post_id_seq" RESTART WITH 6`,
  );
}
