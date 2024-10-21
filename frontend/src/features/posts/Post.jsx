import { useQueryClient } from "@tanstack/react-query";
import { Loader, MessageCircle, Share, ThumbsUp, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deletePostById } from "../../services/apiPost";
import { useDeletePost } from "./useDeletePost";
import PostAction from "./PostAction";

function Post({ post }) {
  const querClient = useQueryClient();

  const authUser = querClient.getQueryData(["authUser"]);

  const { delePost, isPending } = useDeletePost();
  const isOwner = authUser?._id === post?.author?._id;
  const isLiked = post?.likes?.includes(authUser?._id);

  function handleDeletePost() {
    console.log(post._id);
    delePost(post._id);
  }

  return (
    <div className="bg-secondary shadow rounded-lg mb-4">
      <div className="p-4">
        {/* profile details and delete button container */}
        <div className="flex justify-between items-center mb-4">
          {/* profile pic and name container */}
          <div className="flex items-center">
            <Link to={"/profile"}>
              <img
                src={post?.author?.profilePicture || "avatar.png"}
                alt={post?.author?.name || "user"}
                className="size-12 mr-2  rounded-full"
              />
            </Link>

            <div>
              <Link to={`/profile`}>
                <h3 className="font-semibold"> {post?.author?.name || "Demo User"}</h3>
              </Link>
              <p className="text-info text-xs">{post?.author?.headline || "LinkedIn User"}</p>
              <p className="text-xs text-info">Time</p>
            </div>
          </div>
          {/* delete button */}
          {isOwner && (
            <div>
              <Link>
                <button className="text-red-500 hover:text-red-700" onClick={handleDeletePost}>
                  {isPending ? <Loader size={18} className="loading-spinner" /> : <Trash2 size={18} />}
                </button>
              </Link>
            </div>
          )}
        </div>
        <p className="mb-2">{post?.content}</p>
        {post.image && <img src={post.image} alt="Post content" className="rounded-lg w-full mb-4" />}

        <div className="flex justify-around items-center">
          <PostAction
            icon={<ThumbsUp size={18} className={!isLiked ? "text-blue-500" : "fill-blue-500"} />}
            text={`Like(2)`}
            onClick={() => console.log(`working`)}
          />

          <PostAction
            icon={<MessageCircle size={18} className="text-blue-500" />}
            text={"comments(1)"}
            onClick={() => console.log(`comments working`)}
          />

          <PostAction
            icon={<Share size={18} className="text-blue-500" />}
            onClick={() => console.log(`share working`)}
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
