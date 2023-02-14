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
            <span
              data-cy="header-title"
              className="font-semibold text-base text-white tracking-tight font-poppins m-48 pl-2 pt-2"
            >
              To Do List App
            </span>
          </div>
          <div></div>
        </div>
      </nav>
    </div>
  );
}
