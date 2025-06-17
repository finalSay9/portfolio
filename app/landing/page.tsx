"use client";
import React from "react";
import Navbar from "./navbar/page";
import Sidebar from "./about/page";
import Skills from "./skills/page";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content area (About Section) */}
      <div className="flex-1">
        <Sidebar />
      </div>

      {/* Skills Section at the bottom */}
      <div className="flex-1">
        <Skills />
      </div>
    </div>
  );
};

export default Page;
