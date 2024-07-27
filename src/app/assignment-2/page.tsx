import { getPostMap } from "../../actions/api";
import NewPostFooter from "../../components/NewPostFooter";
import PostList from "../../components/PostList";

export default async function assignment2() {
  const { posts, postMap } = await getPostMap();

  return (
    <div className="p-5 pb-20">
      <h1>This is second</h1>

      <PostList postId={0} postMap={postMap} posts={posts} depth={0} />

      <NewPostFooter />
    </div>
  );
}
