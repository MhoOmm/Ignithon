import React from 'react'
import Logo from "../src/assets/Logo.png"   
import { FiLogOut } from "react-icons/fi"

const Navbar = () => {
  return (   
    <div className="flex justify-between items-center px-6 py-3 shadow-md bg-white">
      
      {/* logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="h-10 w-auto" />
      </div>

      {/* bar */}
      <div>
        <ul className="flex gap-6 font-medium text-gray-700">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Risk Check</li>
          <li className="hover:text-blue-600 cursor-pointer">MindCare</li>
          <li className="hover:text-blue-600 cursor-pointer">Book Test</li>
          <li className="hover:text-blue-600 cursor-pointer">Diet</li>
        </ul>
      </div>
      
      {/* logout */}
      <div className="cursor-pointer text-red-500 hover:text-red-700">
        <FiLogOut size={22} />
      </div>

    </div>
  )
}

export default Navbar
