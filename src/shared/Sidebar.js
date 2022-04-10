import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex flex-col py-4 px-8 text-left">
      <div>
        <Link to="/story">
          <h2 className="text-base font-alata my-2 cursor-pointer">
            Minerpets world
          </h2>
        </Link>
        <h2 className="text-base font-alata my-2 cursor-pointer">
          Learning Modules
        </h2>
        <h2 className="text-base font-alata my-2 cursor-pointer">
          NFTs minting
        </h2>
        <h2 className="text-base font-alata my-2 cursor-pointer">
          Suggestions
        </h2>
        <h2 className="text-base font-alata my-2 cursor-pointer">Final Wiki</h2>
        <Link to="/profile">
          <h2 className="text-base font-alata my-2 cursor-pointer">Profile</h2>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
