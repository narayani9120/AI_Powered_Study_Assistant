import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AllResults from "./AllResults";
import Calender from "./Calender";
import Features from "./Features";
import Homework from "./Homework";

const DashBoard = () => {
  return (
    <div className="flex w-full">
       
    <Sidebar />

    <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto transition-colors duration-300">
    <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3 content */}
        <div className="lg:col-span-2 space-y-6">
          <Features />
          <AllResults />
        </div>

        {/* Right Sidebar content */}
        <div className="space-y-6">
          <Calender />
          <Homework />
        </div>
      </div>
    </main>
  </div>
  );
};

export default DashBoard;
