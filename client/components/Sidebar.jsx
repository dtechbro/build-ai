"use client";
import { MdOutlineMenu } from "react-icons/md";

import { CiServer, CiSettings } from "react-icons/ci";
import { IoChatbubbles } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
function SideBar() {
  const { username } = useContext(UserContext);
  return (
    <>
      <div className="md:flex hidden w-2/12 bg-gray-50 p-8 gap-10 flex-col justify-between h-screen">
        <div className="flex flex-col gap-8">
          <div>
            <MdOutlineMenu className="text-lg" />
          </div>

          <button className="flex items-center gap-2">
            <GoPlus className="text-2xl" />
            New Chat
          </button>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg text-gray-400">Recents</h1>
            <div className="flex flex-col gap-4">
              <Link
                href={"#"}
                className="flex text-gray-400 gap-2 items-center"
              >
                <IoChatbubbles className="text-primarycolor" />
                History Chat
              </Link>

              <Link
                href={"#"}
                className="flex text-gray-400 gap-2 items-center"
              >
                <IoChatbubbles className="text-primarycolor" />
                History Chat
              </Link>

              <Link
                href={"#"}
                className="flex text-gray-400 gap-2 items-center"
              >
                <IoChatbubbles className="text-primarycolor" />
                History Chat
              </Link>
            </div>
          </div>
        </div>

        <div>
          <Link href={"#"} className="flex text-gray-400 gap-2 items-center">
            Settings
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-[40px] h-[40px] bg-black flex justify-center items-center rounded-full">
              <h1 className="text-white">A</h1>
            </div>

            <h1>{username}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
