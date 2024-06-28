"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserData } from "@/lib/cookie";
import Image from "next/image";
import logo from "@/images/log.png";
import { deleteUser } from "@/lib/cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface headerData {
  data: UserData;
}
const destroyCookies = async () => {
  await deleteUser();
};
const Header = ({ data }: headerData) => {
  const deleteUse = destroyCookies;

  console.log("data**", data);

  return (
    <header className="bg-grey-500 shadow-md">
      <div className="container mx-auto px-3 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="w-16">
          <Image src={logo} alt="logo" />
        </div>

        {/* Navigation Links */}
        {/*     <nav className="hidden md:flex space-x-6">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>
        </nav> */}

        {/* Profile Button */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <DropdownMenuLabel className="mx-2">{data.user.firstName} {data.user.lastName}</DropdownMenuLabel>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel onClick={() => deleteUse()}>
                Log out
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
