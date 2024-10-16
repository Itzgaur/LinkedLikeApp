import { Link } from "react-router-dom";
import { BellIcon, Home, LogOut, User, Users } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../features/auth/useLogout";

export default function NavBar() {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);
  const { logout } = useLogout();

  return (
    // outer container
    <nav className="bg-secondary shadow-md">
      {/* max width and center alignment */}
      <div className="max-w-7xl  mx-auto px-4  ">
        {/* navigation bar container */}
        <div className="flex justify-between items-center py-3">
          {/* logo */}
          <div className="flex items-center \">
            <Link to={"/home"}>
              <img src="small-logo.png" alt="linkedIn" className="h-8 rounded" />
            </Link>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-4 md:gap-6">
            {authUser ? (
              <>
                <Link to={"/home"} className="text-neutral flex flex-col items-center text-ne">
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>

                <Link to={"/network"} className="text-neutral flex flex-col items-center text-ne relative ">
                  <Users size={20} />
                  <span className="text-xs hidden md:block">Network</span>
                  {/* notification count */}
                  <span
                    className="absolute -top-1  -right-1 bg-blue-500 rounded-full
                 text-white text-xs size-3 md:size-4 flex items-center justify-center md:right-4 "
                  >
                    2
                  </span>
                </Link>
                <Link to={"/home"} className="text-neutral flex flex-col items-center text-ne relative">
                  <BellIcon size={20} />
                  <span className="text-xs hidden md:block">Notification</span>
                  <span
                    className="absolute -top-1  -right-1 bg-blue-500 rounded-full
                 text-white text-xs size-3 md:size-4 flex items-center justify-center md:right-4 "
                  >
                    2
                  </span>
                </Link>
                <Link to={"/home"} className="text-neutral flex flex-col items-center text-ne">
                  <User size={20} />
                  <span className="text-xs hidden md:block">Me</span>
                </Link>

                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                  onClick={logout}
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
