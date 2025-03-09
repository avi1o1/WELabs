"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Calendar, Award, Globe } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const OutreachPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use system preference for initial theme
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Outreach programs data
  const outreachPrograms = [
    {
      title: "Community Workshops",
      description: "Free workshops covering various topics to help community members develop new skills with virtual labs.",
      color: "bg-green-50 dark:bg-green-900/30",
      icon: <Users size={24} className={isDarkMode ? "text-green-400" : "text-green-600"} />
    },
    {
      title: "Educational Support",
      description: "Providing tutoring and educational materials for students of all ages to enhance learning through virtual experiments.",
      color: "bg-blue-50 dark:bg-blue-900/30",
      icon: <Award size={24} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />
    },
    {
      title: "Mentorship Program",
      description: "Connecting experienced professionals with students and early-career individuals interested in virtual labs.",
      color: "bg-purple-50 dark:bg-purple-900/30",
      icon: <Calendar size={24} className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
    },
    {
      title: "Global Outreach",
      description: "Extending virtual lab access to underserved communities worldwide through partnerships and targeted initiatives.",
      color: "bg-yellow-50 dark:bg-yellow-900/30",
      icon: <Globe size={24} className={isDarkMode ? "text-yellow-400" : "text-yellow-600"} />
    }
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-200`}
    >
      {/* Navigation Bar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 space-y-16 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-xl relative"
        >
          <div
            className={`${
              isDarkMode
                ? "bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900"
                : "bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500"
            } text-white`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <svg
                className="absolute -right-10 -top-20 w-96 h-96 text-white opacity-10"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                <path
                  d="M44.5,-76.3C56.6,-69.3,64.8,-54.1,71.4,-39.1C78.1,-24.1,83.2,-9.3,81.2,4.7C79.1,18.7,69.9,31.9,59.1,42.4C48.2,53,35.5,60.9,21.7,66.1C7.8,71.3,-7.2,73.8,-20.8,70.3C-34.4,66.9,-46.6,57.4,-55.9,45.6C-65.2,33.7,-71.7,19.5,-74.7,3.9C-77.7,-11.7,-77.2,-28.6,-68.7,-40C-60.2,-51.4,-43.8,-57.3,-28.9,-63.5C-14.1,-69.7,0.1,-76.2,15.2,-78.9C30.4,-81.6,48.4,-80.5,51.4,-76.2C54.3,-72,44.4,-54.7,44.5,-76.3Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="p-8 md:p-16 relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Outreach Programs
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                We are committed to making a positive impact in our community through various outreach initiatives.
                Our programs focus on education, support, and community building around virtual labs.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Mission
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Expanding the reach of virtual labs to benefit diverse communities
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl p-8 ${
              isDarkMode
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white shadow-xl"
            }`}
          >
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Our outreach mission is to democratize access to quality education through virtual labs technology.
              We believe that everyone should have the opportunity to engage with practical science and engineering
              experiences, regardless of geographical location or resource constraints. Through our outreach
              initiatives, we aim to:
            </p>
            
            <div className="mt-8">
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Increase awareness of virtual labs as an educational resource",
                  "Provide training and support for educators implementing virtual labs",
                  "Reach underserved communities with limited access to lab facilities",
                  "Support students in developing practical skills through virtual experimentation",
                  "Collaborate with educational institutions to enhance their curriculum",
                  "Gather feedback to continuously improve the virtual lab experience"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className={`w-5 h-5 mr-2 mt-1 ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Programs Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Current Programs
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Our initiatives designed to extend the benefits of virtual labs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {outreachPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700"
                    : "bg-white"
                }`}
              >
                <div className={`p-8 ${isDarkMode ? program.color.split(" ")[1] : program.color.split(" ")[0]}`}>
                  <div className="flex items-center mb-4">
                    {program.icon}
                    <h3
                      className={`text-xl font-semibold ml-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {program.title}
                    </h3>
                  </div>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {program.description}
                  </p>
                  <button
                    className={`inline-flex items-center font-medium transition-colors ${
                      isDarkMode
                        ? "text-green-400 hover:text-green-300"
                        : "text-green-600 hover:text-green-800"
                    }`}
                  >
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`rounded-2xl overflow-hidden ${
            isDarkMode
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white shadow-xl"
          }`}
        >
          <div className="p-8">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Our Impact
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Through our outreach efforts, we've been able to make significant contributions:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className={`p-6 rounded-lg text-center ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}>
                <div className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}>
                  50+
                </div>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Schools Engaged
                </p>
              </div>
              
              <div className={`p-6 rounded-lg text-center ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}>
                <div className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}>
                  5,000+
                </div>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Students Reached
                </p>
              </div>
              
              <div className={`p-6 rounded-lg text-center ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}>
                <div className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}>
                  200+
                </div>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Workshops Conducted
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Success Stories
              </h3>
              <div className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}>
                <p className={`italic mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  "The virtual labs program has transformed how our students engage with science experiments. 
                  Students who previously had no access to laboratory equipment can now conduct sophisticated 
                  experiments virtually, expanding their understanding and interest in STEM fields."
                </p>
                <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                  — Dr. Sarah Johnson, Principal, Westfield High School
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Get Involved Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${
            isDarkMode
              ? "bg-gradient-to-r from-green-900 to-emerald-900 shadow-lg"
              : "bg-gradient-to-r from-green-500 to-emerald-500 shadow-xl"
          }`}
        >
          {/* Background patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute -right-16 -bottom-16 w-96 h-96 text-white opacity-10"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path
                d="M37.9,-65.8C47.4,-58.6,52.5,-44.7,59.7,-31.9C66.9,-19,76.1,-7.1,77.4,5.8C78.7,18.8,72,32.8,62.3,43.1C52.5,53.5,39.8,60.1,26.5,64.3C13.3,68.5,-0.5,70.2,-14.7,68.5C-28.9,66.9,-43.5,61.9,-54.9,52.3C-66.2,42.7,-74.4,28.7,-77,13.5C-79.6,-1.7,-76.7,-17.9,-69.9,-32.2C-63.1,-46.5,-52.6,-58.8,-40,-65.2C-27.3,-71.6,-12.5,-72,1,-73.5C14.4,-75.1,28.3,-73,37.9,-65.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Get Involved
            </h2>
            <p className="text-white text-lg mb-6">
              We're always looking for volunteers and partners to help expand our outreach efforts.
              If you're interested in contributing, please reach out to us.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="font-semibold text-xl mb-4">For Volunteers</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Assist in workshop facilitation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mentor students in virtual lab use</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="font-semibold text-xl mb-4">For Partners</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Co-develop outreach initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Provide resources for program expansion</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-green-700 hover:bg-gray-100 transition-colors rounded-lg font-medium">
                Contact Us
              </button>
              <button className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white/10 transition-colors rounded-lg font-medium">
                Request a Workshop
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default OutreachPage;