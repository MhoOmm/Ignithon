import React from 'react'
import Logo from "../src/assets/Logo.png"   
import { FiLogOut } from "react-icons/fi"

const Navbar = () => {
  return (   
    <div className="flex justify-between items-center px-6 shadow-md bg-white backdrop-blur-lg">
      
      {/* logo */}
      <div className="flex items-center gap-2 hover:drop-shadow-[0_4px_6px_#6366F1]">
        <img src={Logo} alt="logo" className=" h-18 w-auto scale-200 transform ml-6" />
      </div> 

      {/* bar */}
      <div>
        <ul className="flex gap-6 font-medium text-gray-700">
          <li className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] hover:transition-all hover:ease-in-out">Home</li>
          <li className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] hover:transition-all hover:ease-in-out">Risk Check</li>
          <li className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] hover:transition-all hover:ease-in-out">MindCare</li>
          <li className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] hover:transition-all hover:ease-in-out">Book Test</li>
          <li className="cursor-pointer hover:text-[#6366F1] hover:drop-shadow-[0_4px_6px_#6366F1] border-b-2 border-transparent hover:border-b-[#6366F1] hover:transition-all hover:ease-in-out">Diet</li>

        </ul>
      </div>
      
      {/* logout */}
      <div className="cursor-pointer text-red-500 hover:text-red-700 hover:drop-shadow-[0_4px_6px_#DE3E3E]">
        <FiLogOut size={22} />
      </div>

    </div>
  )
}

export default Navbar
