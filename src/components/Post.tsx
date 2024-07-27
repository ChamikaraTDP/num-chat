"use client";

import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import Image from "next/image";

export default function Post({ post, depth }) {
  const [isOpen, setIsOpen] = useState(false);

  const getOperationText = (operand, input) => {
    switch (operand) {
      case 'A': return '+ ' + input;
      case 'S': return '- ' + input;
      case 'M': return 'x ' + input;
      case 'D': return '÷ ' + input;
      default: return '';
    }
  }

  return (
    <div
      className="border rounded mt-5 p-4 flex"
      style={{ marginLeft: 40 * depth + "px" }}
    >
      <div className="p-2 text-center">
        <Image src={"/icons/user.png"} alt="User Image" height={50} width={50} />
        <h2 className="mt-2">{post.username}</h2>
      </div>

      <div className="ml-10">
        <h3 className="text-xl">{getOperationText(post.operand, post.input)}</h3>
        <h3 className="text-2xl font-bold">{post.value}</h3>

        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="mt-2 py-1 px-2 border rounded hover:text-blue-500"
        >
          Reply
        </button>
      </div>

      <CreatePostModal
        isNew={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add your reply"
        postId={post.post_id}
        value={post.value}
      />
    </div>
  );
}
