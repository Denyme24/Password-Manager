import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white fixed w-[100%]">
      <div className="mycontainer flex justify-between items-center px-4 h-12 py-5">
        <div className="logo font-bold text-white text-2xl cursor-pointer ">
          <span className="text-amber-500">&lt;</span>
          cipherNest
          <span className="text-amber-500">/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-5">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold " href="#">
              About
            </a>
            <a className="hover:font-bold " href="/">
              Contacts
            </a>
          </li>
        </ul> */}
        <a
          href="https://github.com/Denyme24/Password-Manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="text-white bg-amber-500 my-4 mx-2 rounded-full flex justify-between items-center ring-white ring-1">
            <img
              className="invert w-10 p-1 py-0"
              src="/github.svg"
              alt="github logo"
            />
            <span className="font-bold px-2">GitHub</span>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
