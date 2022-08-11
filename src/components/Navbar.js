import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-[#16ABF8] p-6">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <span className="font-semibold text-xl text-white tracking-tight">
              To Do List App
            </span>
          </div>
          <div></div>
        </div>
      </nav>
    </div>
  );
}
