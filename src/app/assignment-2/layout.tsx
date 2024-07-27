import Link from "next/link";
import { auth } from "../../../auth";
import { getPostMap } from "../../actions/api";
import NewPostFooter from "../../components/NewPostFooter";
import PostList from "../../components/PostList";

export default async function assignment2({ children }) {
  const postMap = await getPostMap();
  const rootPosts = postMap["0"];

  const session = await auth();

  return (
    <div className="p-5 pb-20">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Second Assignment </h1>

        {session?.user ? (
          <h1 className="text-lg mr-10">Logged in as: <b>{session?.user?.name}</b></h1>
        ) : (
          <h1 className="text-lg mr-10">
            <Link className="hover:text-blue-500" href="/assignment-2/login">
              Log In
            </Link>
          </h1>
        )}
      </div>

      {rootPosts.map((post) => {
        return (
          <PostList
            key={post.post_id}
            post={post}
            postMap={postMap}
            depth={0}
          />
        );
      })}

      <NewPostFooter />

      {children}
    </div>
  );
}
