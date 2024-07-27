"use server";

import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";
import { getKnex } from "../database";
import { getNewValue } from "../lib";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function getUser(username: string) {
  const knex = getKnex();
  const user = await knex("user").where("username", username).first();

  return user;
}

export async function createUser(prevState: any, formData: FormData) {
  const userData = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirmPassword"),
  };

  const parsedCredentials = z
    .object({
      username: z.string().min(4).max(16),
      password: z.string().min(6),
      confirm_password: z.string().min(6),
    })
    .safeParse(userData);

  if (
    parsedCredentials.success &&
    userData.password === userData.confirm_password
  ) {
    const knex = getKnex();
    const user = await knex("user")
      .where("username", userData.username)
      .first();

    if (user) {
      return {
        message: "Username already taken!",
      };
    }

    const hashedPass = await bcrypt.hash(userData.password, 10);

    await knex("user").insert({
      username: userData.username,
      password: hashedPass,
    });

    redirect("/assignment-2/login");
  }

  return {
    message: "Please check your input!",
  };
}

export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials" };
        default:
          return { message: "Something went wrong" };
      }
    }

    if (isRedirectError(error)) {
      redirect("/assignment-2");
    }

    return { message: "Unknown error occured" };
  }
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
  const session = await auth();

  if (!session?.user) redirect("/assignment-2/login");

  const postData = {
    value: formData.get("prevValue"),
    postId: formData.get("postId"),
    input: formData.get("inpNum"),
    operand: formData.get("operand"),
  };

  const post = {
    value: Number(postData.input),
    owner_id: Number(session.user.email),
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

  redirect("/assignment-2");
}
