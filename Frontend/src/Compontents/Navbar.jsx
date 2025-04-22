import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { setUser } from "../Redux/userSlice";

const Navbar = () => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch(); // Import useDispatch from react-redux
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token");
    
        if (!token) return;
    
        const response = await fetch("http://localhost:4000/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json(); // e.g. { username: "JohnDoe" }
          dispatch(setUser({ username: data.username }));
        } else {
          console.error("Failed to fetch user:", await response.text());
        }
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };
    
   fetchSession();
  }, [dispatch]);
  return (
    <div>
      <div className="w-full bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
          </div>
          <input
            type="text"
            className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
            placeholder="Search"
          />
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center gap-4">
        <ThemeToggle/>
          <Link to="/login">
            <button className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </Link>

          
          <nav className=" text-black px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold"></h1>
            {username ? (
              <span className="text-black font-medium">
                Welcome, {username}
              </span>
            ) : (
              <span className="text-black">Not logged in</span>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
