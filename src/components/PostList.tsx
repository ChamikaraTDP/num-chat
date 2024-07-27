import Post from "./Post";

export default function PostList({ post, postMap, depth }) {
  const children = postMap[post.post_id.toString()];

  return (
    <div>
      {post && <Post post={post} depth={depth} />}

      {children &&
        children.length > 0 &&
        children.map((childPost) => (
          <PostList
            key={childPost.post_id}
            post={childPost}
            postMap={postMap}
            depth={depth + 1}
          />
        ))}
    </div>
  );
}
