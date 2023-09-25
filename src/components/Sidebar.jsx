import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import { FiMenu, FiX } from "react-icons/fi"; // Import the FiX icon for the close button
import { IoSearchOutline } from "react-icons/io5";

export const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="lg:flex lg:flex-[0.2] lg:flex-col gap-2 text-white rounded-md py-4 px-4 backdrop-blur-lg lg:max-h-[100vh] lg:h-[100vh] flex flex-col">
      {/* Hamburger menu button when menu is closed on small screens */}
      {!showMenu && (
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-gray-300">
            <FiMenu />
          </button>
        </div>
      )}

      {/* Close button when menu is open on small screens */}
      {showMenu && (
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-gray-300">
            <FiX />
          </button>
        </div>
      )}

      {/* Sidebar content for small screens */}
      <nav className={`lg:flex flex flex-col p-4 ${showMenu ? "flex" : "hidden"}`}>
        <Link to={"/"}>
          <div className="flex items-center gap-4 mb-4 cursor-pointer hover:underline">
            <SlHome style={{ fontSize: "1.5rem" }} />
            <span className="text-lg">Home</span>
          </div>
        </Link>
        <Link to={"/search"}>
          <div className="flex items-center gap-4 mb-4 cursor-pointer hover:underline">
            <IoSearchOutline style={{ fontSize: "1.5rem" }} />
            <span className="text-lg">Search</span>
          </div>
        </Link>
      </nav>

      {/* Content for normal and large screens */}
      {/* <div className="lg:flex hidden">
        <Link to={"/"}>
          <div className="flex items-center gap-4 mb-4 cursor-pointer hover:underline">
            <SlHome style={{ fontSize: "1.5rem" }} />
            <span className="text-lg">Home</span>
          </div>
        </Link>
        <Link to={"/search"}>
          <div className="flex items-center gap-4 mb-4 cursor-pointer hover:underline">
            <IoSearchOutline style={{ fontSize: "1.5rem" }} />
            <span className="text-lg">Search</span>
          </div>
        </Link>
      </div> */}
    </div>
  );
};