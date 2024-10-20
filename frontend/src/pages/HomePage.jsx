import PostCreation from "../features/posts/PostCreation";
import Sidebar from "../ui/Sidebar";

function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* sidebar container */}
      <div className="hidden lg:block col-span-1">
        <Sidebar />
      </div>

      {/* posts container */}
      <div className="lg:col-span-2">
        <PostCreation />
      </div>
    </div>
  );
}

export default HomePage;
