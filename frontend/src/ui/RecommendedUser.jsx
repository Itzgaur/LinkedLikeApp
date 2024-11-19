import { User2 } from "lucide-react";
import { Link } from "react-router-dom";

function RecommendedUser({ suggestedUser }) {
  return (
    <div className=" flex items-center justify-between mb-4">
      <div className="flex items-center flex-grow">
        <img src={suggestedUser?.profilePicture || "avatar.png"} alt="" className="h-12 w-12 rounded-full mr-3" />

        <div>
          <h3 className="font-semibold text-sm"> {suggestedUser.name || "Demo User"}</h3>
          <p className="text-info text-xs">{suggestedUser.headline || "LinkedIn User"}</p>
        </div>
      </div>

      <button className="px-3 py-1 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center">
        <User2 size={20} className="mr-1" />
        Connect
      </button>
    </div>
  );
}

export default RecommendedUser;
