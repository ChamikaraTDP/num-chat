import Post from "./Post";

export default function PostList({ postId, posts, postMap, depth }) {
  const children = postMap[postId.toString()];
  const post = posts.find((post) => post.post_id === postId);

  return (
    <div>
      {post && <Post post={post} depth={depth} />}

      {children &&
        children.length > 0 &&
        children.map((child) => (
          <PostList
            key={child}
            postId={child}
            posts={posts}
            postMap={postMap}
            depth={depth + 1}
          />
        ))}
    </div>
  );
}
