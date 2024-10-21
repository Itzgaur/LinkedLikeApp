import { Loader, Users } from "lucide-react";
import PostCreation from "../features/posts/PostCreation";
import { usePosts } from "../features/posts/usePosts";
import Sidebar from "../ui/Sidebar";
import Post from "../features/posts/post";

function HomePage() {
  const { posts, isLoading } = usePosts();

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
    </div>
  );
}

export default HomePage;
