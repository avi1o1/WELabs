"use client";

import React from "react";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleTheme,
  isMenuOpen,
  toggleMenu,
}) => {
  // Hardcoded navigation items
  const navItems = [
    {
      title: "About",
      dropdownItems: [
        { title: "Virtual Labs", link: "/Vlabs/" },
        { title: "VLEAD", link: "/vlead/" },
      ],
    },
    {
      title: "I am",
      dropdownItems: [
        { title: "a Learner", link: "/experiments/" },
        { title: "a Facilitator", link: "/outreach/" },
        { title: "a Creator", link: "/development/" },
      ],
    },
    {
      title: "I want to",
      dropdownItems: [
        {
          title: "Create Experiment",
          link: "/development/#development-process",
        },
        { title: "Start Learning", link: "/experiments/" },
        { title: "Host Workshop", link: "/outreach/#request-a-workshop" },
        { title: "Explore Research", link: "/research/" },
      ],
    },
    {
      title: "Analytics",
      dropdownItems: [
        { title: "Summary", link: "/summary/" },
        { title: "Detailed Analysis", link: "/detailedAnalysis/" },
      ],
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
          isDarkMode
            ? "bg-gray-900/90 border-b border-zinc-800"
            : "bg-white/90 border-b border-gray-100"
        } shadow-sm transition-all duration-200`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-6">
              <a href="/" className="flex items-center">
                <img
                  src="https://cdn.vlabs.ac.in/logo/vlabs-color-large-moe.png"
                  alt="Virtual Labs Logo"
                  className="h-10 md:h-11"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <button className="flex items-center space-x-1 font-medium cursor-pointer">
                    <span>{item.title}</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 mt-2 w-56 rounded-md shadow-lg py-1 transition-all duration-150 ease-in-out ${
                      isDarkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    {item.dropdownItems.map((dropItem, idx) => (
                      <React.Fragment key={idx}>
                        <a
                          href={dropItem.link}
                          className={`block px-4 py-2.5 text-sm hover:bg-blue-500 hover:text-white transition-colors ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {dropItem.title}
                        </a>
                        {idx < item.dropdownItems.length - 1 && (
                          <hr
                            className={`${
                              isDarkMode ? "border-gray-700" : "border-gray-100"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-100 text-blue-600 hover:bg-gray-200"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-40 pt-20 ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="container mx-auto px-4 pb-8">
            {/* Mobile nav items */}
            <div className="space-y-8">
              {navItems.map((item, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <div className="space-y-3 pl-3">
                    {item.dropdownItems.map((dropItem, idx) => (
                      <a
                        key={idx}
                        href={dropItem.link}
                        className={`py-2 flex items-center transition-colors ${
                          isDarkMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-800"
                        }`}
                      >
                        <ArrowRight size={16} className="mr-2" />
                        {dropItem.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
