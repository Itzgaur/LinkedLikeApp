import { Bell, Home, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ user }) {
  return (
    <div className="bg-secondary shadow-md rounded-lg">
      <div className="text-center p-4">
        {/* Banner image */}
        <div
          className=" h-16 rounded-t-lg bg-cover"
          style={{
            backgroundImage: `url("banner.png")`,
          }}
        />
        {/* todo:add user details */}
        <Link to={"/profile"}>
          <img src="avatar.png" alt="profile-picture" className="h-20 w-20 rounded-full mx-auto mt-[-40px]" />

          <h2 className="text-xl mt-2 font-semibold">{user?.name || "Demo user"}</h2>
        </Link>
        <p className="text-info">{user?.headline || "LinkedIn user"}</p>
        <p className="text-info text-xs">{user?.connections.length || "0"} connections</p>
      </div>

      <div className="border-t border-base-100 p-4">
        <nav>
          <ul>
            <li>
              <Link
                to={"/home"}
                className="flex items-center rounded-md py-2 px-4 hover:bg-primary hover:text-white transition-colors"
              >
                <Home size={20} className="mr-2" /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/home"}
                className="flex items-center rounded-md py-2 px-4 hover:bg-primary hover:text-white transition-colors"
              >
                <UserPlus size={20} className="mr-2" /> <span>My Network</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/home"}
                className="flex items-center rounded-md py-2 px-4 hover:bg-primary hover:text-white transition-colors"
              >
                <Bell size={20} className="mr-2" /> <span>Notification</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-base-100 p-6">
        <Link to={`/profile/${user?.username} || "/profile"`} className="text-sm font-semibold">
          Visit your profile
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
