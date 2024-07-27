"use client";

import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

export default function NewPostFooter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <div className="">
        <button
          className="p-2 border rounded hover:text-blue-500"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Start New Discussion
        </button>
      </div>

      <CreatePostModal
        isNew
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create New Post"
        postId={""}
        value={""}
      />
    </div>
  );
}
