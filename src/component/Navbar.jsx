import { Link, NavLink } from 'react-router-dom'
import { MapPin, } from "lucide-react";
import { FaCaretDown } from "react-icons/fa"
import { IoCartOutline } from "react-icons/io5";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';



function Navbar() {
  const location = false
  const { productItems } = useCart()
  const [openNav, setopenNav] = useState(false)
  return (
    <div className="bg-white md:py-3 fixed top-0 left-0 right-0 z-999 mb-10 p-5 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center ">
        <div className="flex gap-7 item-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl"><span className="text-red-500">Z</span>eptro</h1>
          </Link>

        </div>
        <nav className="flex gap-7 item-center">
          <ul className="md:flex gap-7 item-center text-xl font-semibold hidden">
            <NavLink to="/" className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black-600"} cursor-pointer`}><li>Home</li></NavLink>
            <NavLink to="/product" className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black-600"} cursor-pointer`} ><li>Product</li></NavLink>
            <NavLink to="/about" className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black-600"} cursor-pointer`}><li>About</li></NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black-600"} cursor-pointer`}> <li>Contact</li></NavLink>
          </ul>
          <Link to="/cart" className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className='bg-red-500 px-2 w-6 h-6 rounded-full absolute -top-3 -right-3 text-white '>{productItems.length}</span>
          </Link>
          <div className="hidden md:block">
            <header>
              <SignedOut>
                <SignInButton className="w-20 h-8 rounded-md text-white bg-red-500" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>
          {
            openNav ? <HiMenuAlt3 onClick={()=>setopenNav(false)}  className="md:hidden  w-[27px] h-[27px]  " /> : <HiMenuAlt1 onClick={()=>setopenNav(true)} className="md:hidden w-[27px] h-[27px] " />
          }
        </nav>
        
      </div>
       <ResponsiveMenu openNav={openNav} setOpenNav={setopenNav}/>
    </div>
    
  )
}

export default Navbar