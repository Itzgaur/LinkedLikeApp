import Sidebar from "../ui/Sidebar";

function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="hidden lg:block col-span-1">
        <Sidebar />
      </div>

      <div></div>
    </div>
  );
}

export default HomePage;
