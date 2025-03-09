"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SummaryPage: React.FC = () => {
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

  // Data for program areas
  const programAreas = [
    {
      title: "Research",
      description: "Conducting innovative research in virtual learning environments and educational technology.",
      color: "bg-blue-50 dark:bg-blue-900/30",
      link: "/research"
    },
    {
      title: "Outreach",
      description: "Engaging with communities to increase awareness and adoption of virtual learning tools.",
      color: "bg-green-50 dark:bg-green-900/30",
      link: "/outreach"
    },
    {
      title: "Development",
      description: "Building and maintaining robust virtual lab infrastructure and experiments.",
      color: "bg-purple-50 dark:bg-purple-900/30",
      link: "/development"
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
                ? "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
                : "bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600"
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
                Summary Overview
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                The Virtual Labs project is an initiative to provide remote access to laboratories in 
                various disciplines of science and engineering. Our platform enables students to perform 
                experiments virtually, enhancing their learning experience regardless of their physical location.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Key Achievements Section */}
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
              Key Achievements
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Milestones and impact of the Virtual Labs initiative
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "150+", label: "Virtual Experiments" },
              { number: "1M+", label: "Student Users" },
              { number: "50+", label: "Educational Institutions" },
              { number: "12", label: "Research Publications" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className={`rounded-2xl p-8 shadow-lg text-center ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700"
                    : "bg-white"
                }`}
              >
                <span className={`text-4xl font-bold block mb-2 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}>
                  {stat.number}
                </span>
                <span className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Program Areas Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Program Areas
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Explore our key focus areas and initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programAreas.map((area, index) => (
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
                <div className={`p-8 ${isDarkMode ? area.color.split(" ")[1] : area.color.split(" ")[0]}`}>
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {area.title}
                  </h3>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {area.description}
                  </p>
                  <a
                    href={area.link}
                    className={`inline-flex items-center font-medium transition-colors ${
                      isDarkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Impact Assessment Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${
            isDarkMode
              ? "bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-xl"
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Impact Assessment
            </h2>
            <p className="text-white text-lg mb-6">
              Our virtual labs have significantly improved learning outcomes across participating institutions:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="font-semibold text-xl mb-4">Student Impact</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>85% report better understanding of concepts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>70% increase in practical experiment completion rates</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="font-semibold text-xl mb-4">Institutional Impact</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>90% of educators cite improved teaching effectiveness</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Reduced educational resource disparities across institutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Future Directions Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`rounded-2xl p-8 md:p-12 ${
            isDarkMode
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white shadow-xl"
          }`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Future Directions
          </h2>
          <p className={`text-lg mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            We are committed to expanding our virtual labs ecosystem with new experiments, improved 
            accessibility features, and enhanced collaboration tools. Our roadmap includes integration 
            with emerging technologies like AR/VR and AI-assisted learning.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
              }`}
            >
              View Roadmap
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode 
                  ? "bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900/30" 
                  : "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Provide Feedback
            </button>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default SummaryPage;