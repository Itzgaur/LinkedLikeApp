import { Image } from "lucide-react";
import { useState } from "react";

import { converImagetoBase64 } from "../../utils/converImagetoBase64";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../lib/axios";
import { createPost } from "../../services/apiPost";
import { useCreatePost } from "./useCreatepost";

function PostCreation() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { createPost, isPending } = useCreatePost();

  async function handlePost() {
    const postData = { content };
    if (image) {
      postData.image = await converImagetoBase64(image);
    }

    handleReset();
    createPost(postData);
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const data = await converImagetoBase64(file);
      setImagePreview(data); // show the preview image in the UI
    } else {
      setImagePreview(null);
    }
  }

  function handleReset() {
    setContent("");
    setImage(null);
    setImagePreview(null);
  }

  return (
    <div className="bg-secondary rounded-lg shadow p-4 mb-4">
      <div className="flex space-x-4">
        <img src="avatar.png" alt="user" className="size-12 rounded-full" />
        <textarea
          placeholder="what's in your mind?"
          className="rounded-lg focus:outline-none  w-full 
          bg-base-100 p-3 hover:bg-base-200 focus:bg-base-200 resize-none min-h-[100px] transition-colors duration-200"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>

      {/* show the image */}
      {imagePreview && !isPending && (
        <div className="mt-4">
          <img src={imagePreview} alt="Selected" className="w-full h-auto rounded-lg" />
        </div>
      )}

      {/* photo and share button */}
      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center text-info hover:text-gray-800 transition-colors duration-200 cursor-pointer">
          <Image size={20} className="mr-2" />
          <span>Photo</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        {/* todo write button content logic and fix the color issue */}
        <div className="flex space-x-3">
          <button
            disabled={!content && !image}
            onClick={handlePost}
            className="bg-primary hover:cursor-pointer hover:bg-[#095cb0] text-white px-4 py-2 rounded-lg  transition-colors duration-200s"
          >
            Share
          </button>
          {(image || content) && (
            <button
              disabled={!image && !content}
              className="bg-error hover:cursor-pointer text-white px-4 py-2 rounded-lg  transition-colors duration-200s"
              onClick={handleReset}
            >
              cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCreation;
