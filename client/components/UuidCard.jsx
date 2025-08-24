import React from 'react'
import initial from '../src/assets/random_initials_ignithon.svg'

const UuidCard = () => {
  return (
    <div class='min-h-screen' style={{ background: "white" }}>
      
      <div id="heading" class="flex items-center justify-center h-20 pt-8">
        <p class="text-4xl font-bold"  style={{fontFamily:"Cinzel"}}>CARD</p>
      </div>

      <div class="w-4/5 mx-auto h-[50vh] flex border mt-12 rounded-xl shadow-xl overflow-hidden" style={{ background: "black" }}>

        <div class="w-[30%] flex items-center justify-center pl-4">
          <div id="photo">
            <img src={initial} class="h-40 w-40 border rounded-full object-cover bg-gray-100" alt="react logo" />
          </div>
        </div>

        <div class="w-[70%] flex flex-col items-center justify-center space-y-4 mt-4">
          <div class="text-2xl w-4/5 h-[6vh] flex items-center justify-center text-center
            border bg-gray-100
            bg-gradient-to-r from-gray-500 to-gray-400 
            rounded-md shadow-md transform transition-transform
            duration-300 ease-out
            hover:scale-105 hover:shadow-xl hover:from-purple-300 hover:to-purple-800"
            style={{fontFamily:"Playfair Display,serif"}}>
            
            <p>Name</p>
          </div>

          <div class="w-4/5 flex justify-between space-x-8">
            <div class="text-2xl w-[80%] h-[6vh] flex items-center justify-center 
              text-center border bg-gray-100 rounded-md
              bg-gradient-to-r from-gray-500 to-gray-400 
              shadow-md transform transition-transform
              duration-300 ease-out
              hover:scale-105 hover:shadow-xl hover:from-purple-300 hover:to-purple-800"
              style={{fontFamily:"Playfair Display,serif"}}>
              
              <p>UUID</p>
            </div>
            <div class="text-2xl w-[20%] h-[6vh] flex items-center justify-center 
              text-center border bg-gray-100 rounded-md
              bg-gradient-to-r from-gray-500 to-gray-400 
              shadow-md transform transition-transform
              duration-300 ease-out
              hover:scale-105 hover:shadow-xl hover:from-purple-300 hover:to-purple-800"
              style={{fontFamily:"Playfair Display,serif"}}>
              
              <p>QR</p>
            </div>
          </div>

          <div class="text-2xl w-4/5 h-[6vh] flex items-center justify-center text-center
            border bg-gray-100
            bg-gradient-to-r from-gray-500 to-gray-400 
            rounded-md shadow-md transform transition-transform
            duration-300 ease-out
            hover:scale-105 hover:shadow-xl hover:from-purple-300 hover:to-purple-800"
            style={{fontFamily:"Playfair Display,serif"}}>
            
            <p>Risk score == Show/Cal</p>
          </div>

          <div class="text-2xl w-4/5 h-[6vh] flex items-center justify-center text-center
            border bg-gray-100
            bg-gradient-to-r from-gray-500 to-gray-400 
            rounded-md shadow-md transform transition-transform
            duration-300 ease-out
            hover:scale-105 hover:shadow-xl hover:from-purple-300 hover:to-purple-800"
            style={{fontFamily:"Playfair Display ,serif"}}>
            
            <p>Phone No.</p>
          </div>
          <div class="w-full text-center justify-center">
          </div>
        </div>
      </div>

      {/* FOOTER OR WOT */}
      <div className="bg-[BLACK] text-[white] py-8 mt-20">
        <div className="container mx-auto px-4">

          <div className="flex justify-between items-start w-full px-[20%] py-8">

            <div className="text-center md:text-left">
              <p className="font-semibold pb-8">COMPANY</p>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <p className="font-semibold pb-8">SUPPORT</p>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="text-right">
              <p className="font-semibold pb-8">FOLLOW US</p>
              <div className="flex  flex-col space-x-1 space-y-1.5">
                <a href="#" className="hover:underline pr-2">Facebook</a>
                <a href="#" className="hover:underline pr-2">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm">
            <p>© 2025, Sanjeevani. All Rights Reserved.</p>
          </div>
        </div>
      </div>

    </div>

  )
}

export default UuidCard
