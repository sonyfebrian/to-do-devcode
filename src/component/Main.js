import React from "react";
import List from "./ListToDo";

export default function Main() {
  return (
    <>
      <div className="grid grid-cols-6 gap-4 mt-20">
        <div className="col-start-2 col-end-3 text-3xl font-bold">Activity</div>
        <div className="col-end-7 col-span-2 ...">
          <button
            type="button"
            className="flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-white bg-[#16ABF8]"
          >
            + Tambah
          </button>
        </div>
      </div>
      <List />
    </>
  );
}
