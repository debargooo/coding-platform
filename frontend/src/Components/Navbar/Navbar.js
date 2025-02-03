import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[rgba(40,40,40,1)] text-white drop-shadow-md p-8 ">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-4xl font-bold">
            YourLogo
          </Link>
          <div className="hidden xl:flex space-x-8 font-semibold text-lg items-center">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/challenges" className="text-white">
              Challenges
            </Link>
            <Link to="/courses" className="text-white">
              Courses
            </Link>
            <Link to="/about" className="text-white">
              About
            </Link>
            <Link to="/contact" className="text-white">
              Contact
            </Link>
            <Link to="/login" className="text-black py-[0.5rem] px-[1rem] font-bold text-base border border-[3px solid rgb(252, 70, 100)] bg-white hover:bg-transparent hover:text-white duration-150 ">
              Login
            </Link>
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="xl:hidden flex items-center space-x-2 px-8">
            <button 
              className="navbar-burger self-center" 
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <RxCross1 className="h-6 w-6" /> : <CiMenuFries className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu (from the right) */}
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-[rgba(40,40,40,1)] z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button 
          className="text-white absolute top-4 left-4" 
          onClick={() => setMenuOpen(false)}
        >
          <RxCross1 className="h-6 w-6 fixed right-0 mt-2 mr-8" />
        </button>
        <div className="flex flex-col items-start space-y-8 p-8 font-semibold text-lg text-white">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/challenges" onClick={() => setMenuOpen(false)}>
            Challenges
          </Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>
            Courses
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/login" className="text-black py-[0.5rem] px-[1rem] font-bold text-base border border-[3px solid rgb(252, 70, 100)] bg-white hover:bg-transparent hover:text-white duration-150 ">
              Login
            </Link>
        </div>
      </div>

      {/* Background Overlay when Sidebar is open */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
