import { useQueryClient } from "@tanstack/react-query";
import { Loader, MessageCircle, Send, Share, ThumbsUp, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeletePost } from "./useDeletePost";
import PostAction from "./PostAction";
import { useLikePost } from "./useLikePost";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useCreateComment } from "./useCreateComment";

function Post({ post }) {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);

  const { delePost, deletePending } = useDeletePost();
  const { likePost, isLiking } = useLikePost();
  const isOwner = authUser?._id === post?.author?._id;
  const isLiked = post?.likes?.includes(authUser?._id);
  const [liked, setLiked] = useState({ isLiked, count: post.likes.length ?? 0 });
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post?.comment || []);
  const [newComment, setNewComment] = useState("");
  const { createComment, isCreatingComment } = useCreateComment();

  function handleDeletePost() {
    delePost(post._id);
  }

  const handleLikePost = async () => {
    if (isLiking) return;
    setLiked((prev) => ({
      isLiked: !prev.isLiked,
      count: prev.isLiked ? prev.count - 1 : prev.count + 1,
    }));
    likePost(post._id);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add the comment to the local state (optimistic UI)
      setComments([
        ...comments, // Spread the existing comments
        {
          content: newComment, // The content of the new comment
          user: {
            _id: authUser._id, // Authenticated user ID
            name: authUser.name, // Authenticated user name
            profilePicture: authUser.profilePicture, // User's profile picture
          },
          createdAt: new Date(), // Timestamp of when the comment was created
        },
      ]);
      await createComment(post._id, newComment);
      // Clear the input field after the comment is added
      setNewComment("");
    }
  };

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
              <p className="text-xs text-info">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
            </div>
          </div>
          {/* delete button */}
          {isOwner && (
            <div>
              <Link>
                <button className="text-red-500 hover:text-red-700" onClick={handleDeletePost}>
                  {deletePending ? <Loader size={18} className="loading-spinner" /> : <Trash2 size={18} />}
                </button>
              </Link>
            </div>
          )}
        </div>
        <p className="mb-2">{post?.content}</p>
        {post.image && <img src={post.image} alt="Post content" className="rounded-lg w-full mb-4" />}

        {/* post actions */}
        <div className="flex justify-around items-center">
          <PostAction
            icon={<ThumbsUp size={18} className={!liked.isLiked ? "text-blue-500" : "fill-blue-500"} />}
            text={`Like (${liked.count})`}
            onClick={handleLikePost}
          />

          <PostAction
            icon={<MessageCircle size={18} className="text-blue-500" />}
            text={`comments (${comments.length})`}
            onClick={() => setShowComments(!showComments)}
          />

          <PostAction
            icon={<Share size={18} className="text-blue-500" />}
            onClick={() => console.log(`share working`)}
          />
        </div>
      </div>

      {showComments && (
        <div className="pb-4 px-4">
          <div className="mb-4 max-h-60 overflow-y-auto">
            {comments.map((comment, index) => (
              <div className="mb-2 bg-base-100 p-2 rounded flex items-center" key={comment?._id || index}>
                <img
                  src={comment?.user?.profilePicture || "/avatar.png"}
                  alt={comment.user.name || "user"}
                  className="mr-2 w-8 h-8 rounded-full bg-red-500"
                />
                <div className=" flex-grow">
                  <div className="flex items-center ">
                    <span className="font-semibold mr-2">{comment.user.name}</span>
                    <span className="text-xs text-info'">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="flex items-center" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="add a comment..."
              className="flex-grow mr-2 p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-full bg-base-10"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-full hover:bg-[#095cb0] transition duration-300"
            >
              {isCreatingComment ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
