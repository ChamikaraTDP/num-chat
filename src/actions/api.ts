"use server";

import { getKnex } from "../database";
import { getNewValue } from '../lib';

export async function getPosts() {
  const knex = getKnex();
  const posts = await knex("post");

  return posts;
}

export async function getPostMap() {
  const knex = getKnex();
  const posts = await knex("post as p")
    .join("user as u", "p.owner_id", "=", "u.user_id")
    .select("p.*", "u.username");

  const postMap = { "0": [] };

  for (let post of posts) {
    if (post.parent_post_id === null) {
      postMap["0"].push(post);
    } else if (postMap[post.parent_post_id]) {
      postMap[post.parent_post_id].push(post);
    } else {
      postMap[post.parent_post_id] = [post];
    }
  }

  return postMap;
}

export async function createPost(formData: FormData) {
  const postData = {
    value: formData.get('prevValue'),
    postId: formData.get('postId'),
    input: formData.get('inpNum'),
    operand: formData.get('operand'),
  };

  const post = {
    value: Number(postData.input),
    owner_id: 1,
    parent_post_id: null,
    operand: postData.operand,
    input: Number(postData.input),
  };

  if (postData.postId) {
    post.value = getNewValue(postData.value, postData.operand, postData.input);
    post.parent_post_id = postData.postId;
  }

  const knex = getKnex();

  await knex("post").insert(post);

  console.log("post created!");
}
