"use client";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  children?:any
}

const Drawer = ({ isOpen, toggleDrawer, children }: DrawerProps) => {
  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ${
          isOpen ? "w-72" : "w-14"
        } bg-gray-800 text-white h-full`}
      >
        <button
          className="p-2 bg-blue-500 hover:bg-blue-700 transition-all duration-300"
          onClick={toggleDrawer}
        >
          {isOpen ? "Close" : "Open"}
        </button>
        <div className={`p-4 ${isOpen ? "block" : "hidden"}`}>
          <p>Drawer Content</p>
        </div>
      </div>
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
