import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
export default function Search() {
  return (
    <div className="text-gray-300">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg message-box overflow-hidden">
        <div className="grid place-items-center h-full w-12">
          <AiOutlineSearch className="cursor-pointer" size={20} color="gray" />
        </div>

        <input
          className="peer h-full w-full outline-none text-sm pr-2 message-box"
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
