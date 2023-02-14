import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav
        data-cy="header-background"
        className="flex items-center justify-between flex-wrap bg-[#16ABF8] p-6"
      >
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <h2
              data-cy="header-title"
              className="font-bold text-2xl text-white tracking-tight font-poppins m-4"
            >
              To Do List App
            </h2>
          </div>
          <div></div>
        </div>
      </nav>
    </div>
  );
}
