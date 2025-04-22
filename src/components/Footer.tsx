import React from 'react'
import {Mail, Phone, Linkedin, Heart} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
  return (
      <footer className=" py-2 font-[family-name:var(--font-outfit)] tracking-wider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div>
                <h1 className='text-green-400 font-semibold bg-slate-900 rounded-md h-[35px] px-2 flex justify-center items-center border-1 mb-2'>----------For Website Contact----------</h1>
            </div>
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
              <Mail className="h-4 w-4" />
              <span>sohebkhan3145@gmail.com</span>
            </div>
            
            <div className="flex items-center space-x-1 text-sm">
              <Phone className="h-4 w-4" />
              <span>+91 9324458770</span>
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm ">
              <span>Created by <span className='text-[18px] ml-1'>Soheb Khan</span></span>
              <Heart className="h-4 w-4 fill-current text-red-600" />
            
            </div>
            
            
              
              
              
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link 
              href="https://wa.me/+919324458770" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700"
            >
              <FaWhatsapp className="h-6 w-6" />
            </Link>
            
            <Link
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
