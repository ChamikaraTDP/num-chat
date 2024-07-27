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
      <h1>This is second</h1>

      <h1>{session?.user?.username}</h1>

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
