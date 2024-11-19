import { Loader, Users } from "lucide-react";
import PostCreation from "../features/posts/PostCreation";
import { usePosts } from "../features/posts/usePosts";
import Sidebar from "../ui/Sidebar";
import Post from "../features/posts/Post";
import RecommendedUser from "../ui/RecommendedUser";
import useSuggestedUser from "../features/user/useSuggestedUser";

function HomePage() {
  const { posts, isLoading } = usePosts();
  const { suggestConnections } = useSuggestedUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* sidebar container */}
      <div className="hidden lg:block col-span-1">
        <Sidebar />
      </div>

      {/* posts container */}
      <div className="lg:col-span-2">
        <PostCreation />

        {/* feed posts */}

        {posts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}

        {posts?.length <= 0 && (
          <div className="bg-white rounded-lg text-center shadow mt-4 p-8">
            <div className="">
              <Users size={100} className="mx-auto text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">No posts yet</h1>
            <p className="text-gray-600 mb-6">start connecting with others to see their posts</p>
          </div>
        )}
      </div>

      {/* recommended user */}
      {suggestConnections?.length > 0 && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-secondary shadow-md rounded-lg p-4">
            <h2 className="mb-4 font-semibold">People you may know</h2>
            {suggestConnections.map((user) => (
              <RecommendedUser suggestedUser={user} key={user._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
