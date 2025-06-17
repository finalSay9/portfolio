"use client";
import React from "react";
import Navbar from './landing/about/page'
import Sidebar from "./landing/navbar/page";
import Skills from "./landing/skills/page";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Top Navbar */}
      <Sidebar />

      {/* Main content area (About Section) */}
      <div className="flex-1">
        <Navbar />
      </div>

      {/* Skills Section at the bottom */}
      <div className="flex-1">
        <Skills />
      </div>
    </div>
  );
};

export default Page;
