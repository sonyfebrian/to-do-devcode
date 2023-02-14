import React from "react";

export default function Navbar() {
  return (
    <div
      data-cy="header-background"
      className="flex items-center justify-between flex-wrap bg-[#16ABF8] p-6"
    >
      <h2
        data-cy="header-title"
        className="font-bold text-2xl text-white tracking-tight font-poppins m-4"
      >
        TO DO LIST APP
      </h2>
    </div>
  );
}
