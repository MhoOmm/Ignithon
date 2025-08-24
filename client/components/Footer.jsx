import React from 'react'

const Footer = () => {
  return (
    <div>
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

export default Footer
