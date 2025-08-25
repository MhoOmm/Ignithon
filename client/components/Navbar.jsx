import React, { useState } from "react";
import Logo from "../src/assets/Logo.png";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // ✅ use react-router-dom instead of react-router

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full shadow-md bg-white backdrop-blur-lg">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 hover:drop-shadow-[0_4px_6px_#6366F1]">
          <img src={Logo} alt="logo" className="h-12 w-auto ml-2 scale-170" />
        </div>

        {/* Hamburger menu (mobile) */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              size={28}
              className="cursor-pointer text-gray-700"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              size={28}
              className="cursor-pointer text-gray-700"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>

        {/* Menu (Desktop) */}
        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          <NavLink
            to="/home"
            className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] transition-all"
          >
            Home
          </NavLink>
          <NavLink
            to="/riskform"
            className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] transition-all"
          >
            Risk Check
          </NavLink>
          <NavLink
            to="/mindcare"
            className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] transition-all"
          >
            MindCare
          </NavLink>
          <NavLink
            to="/testbooking"
            className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] transition-all"
          >
            Book Test
          </NavLink>
          <NavLink
            to="/doctor"
            className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] transition-all"
          >
            Doctor
          </NavLink>
        </ul>

        {/* Logout Section */}
        <div className="hidden md:flex cursor-pointer text-red-500 gap-6">
          <NavLink to="/Uidcard">
            <FaAddressCard
              size={25}
              className="hover:drop-shadow-[0_4px_6px_#DE3E3E] hover:text-red-700"
            />
          </NavLink>
          <FiLogOut
            size={25}
            className="hover:drop-shadow-[0_4px_6px_#DE3E3E] hover:text-red-700"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-gray-50 text-gray-700 font-medium shadow-lg">
          <NavLink
            to="/home"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#6366F1]"
          >
            Home
          </NavLink>
          <NavLink
            to="/riskform"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#6366F1]"
          >
            Risk Check
          </NavLink>
          <NavLink
            to="/mindcare"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#6366F1]"
          >
            MindCare
          </NavLink>
          <NavLink
            to="/testbooking"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#6366F1]"
          >
            Book Test
          </NavLink>
          <NavLink
            to="/doctor"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#6366F1]"
          >
            Doctor
          </NavLink>

          <div className="flex gap-6 pt-4 text-red-500">
            <NavLink to="/Uidcard" onClick={() => setIsOpen(false)}>
              <FaAddressCard size={25} className="hover:text-red-700" />
            </NavLink>
            <FiLogOut size={25} className="hover:text-red-700" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
