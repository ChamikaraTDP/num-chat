"use client";

import { createPost } from "../actions/api";
import CrossIcon from "@assets/icons/cross.svg";

export default function CreatePostModal({
  title,
  postId,
  value,
  isOpen,
  setIsOpen,
  isNew,
}) {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed top-0 left-0 h-screen w-screen bg-[#2f7bdf1a] z-20  flex justify-center items-center`}
    >
      <div className="bg-white relative p-4">
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <CrossIcon width={16} height={16} />
        </div>

        <div className="w-[600px] font-bold">{title}</div>

        <form
          action={(formData) => {
            createPost(formData).finally(() => {
              setIsOpen(false);

              window.location.reload();
            });
          }}
        >
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="prevValue" value={value} />

          {!isNew && (
            <div className="mt-4">
              <label htmlFor="operand" className="pr-2">
                Operation:
              </label>
              <select id="operand" name="operand">
                <option value="A">Addition (+)</option>
                <option value="S">Subtraction (-)</option>
                <option value="M">Multiplication (x)</option>
                <option value="D">Division (&#247;)</option>
              </select>
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="inpnum" className="pr-2">
              Number:
            </label>
            <input
              id="inpnum"
              className="rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              type="number"
              name="inpNum"
              required
            />
          </div>

          <div className="mt-4">
            <input
              className="cursor-pointer p-2 rounded border"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
