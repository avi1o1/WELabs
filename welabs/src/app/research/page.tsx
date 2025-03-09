"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText, Users, Database, Lightbulb } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ResearchPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ongoing");

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

  // Research categories tabs
  const researchTabs = [
    { id: "ongoing", label: "Ongoing Research" },
    { id: "completed", label: "Completed Projects" },
    { id: "publications", label: "Publications" },
    { id: "collaborations", label: "Collaborations" }
  ];

  // Research focus areas
  const researchAreas = [
    {
      title: "Virtual Learning Environments",
      description: "Exploring innovative approaches to create immersive and effective virtual laboratories for education.",
      icon: <Database className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={24} />,
      papers: 8
    },
    {
      title: "Interactive Simulation Systems",
      description: "Developing advanced simulation technologies to model complex scientific phenomena.",
      icon: <Lightbulb className={isDarkMode ? "text-purple-400" : "text-purple-600"} size={24} />,
      papers: 12
    },
    {
      title: "Educational Technology",
      description: "Researching methods to enhance learning outcomes through technological integration.",
      icon: <Users className={isDarkMode ? "text-green-400" : "text-green-600"} size={24} />,
      papers: 7
    }
  ];

  // Publications list
  const publicationsList = [
    { 
      title: "Advancements in Virtual Laboratory Design: A Comprehensive Review",
      authors: "Sharma, P., Gupta, S., & Reddy, K.",
      journal: "Journal of Educational Technology",
      year: "2024",
      type: "PDF"
    },
    { 
      title: "Comparative Analysis of Student Engagement in Physical vs. Virtual Labs",
      authors: "Reddy, K., Singh, A., & Patel, M.",
      journal: "Science Education Quarterly",
      year: "2023",
      type: "PDF"
    },
    { 
      title: "Implementing Accessible Design in Online Scientific Laboratories",
      authors: "Gupta, S., Sharma, P., & Singh, A.",
      journal: "Inclusive Education Today",
      year: "2023",
      type: "PDF"
    },
    { 
      title: "Machine Learning Approaches to Adaptive Virtual Lab Experiences",
      authors: "Patel, M., Kumar, R., & Sharma, P.",
      journal: "AI in Education Review",
      year: "2022",
      type: "PDF"
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
                Research Initiatives
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                Our research team is dedicated to advancing knowledge and innovation in key areas that 
                drive technological progress and address real-world challenges in virtual learning environments.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Research Overview */}
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
              Our Research Focus
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Through collaboration, experimentation, and rigorous analysis, we aim to contribute 
              meaningful insights to the scientific community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Publications", "Active Projects", "Partner Institutions", "Research Grants"].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className={`rounded-xl p-6 ${
                  isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-md"
                } ${index === 0 || index === 1 ? "lg:col-span-2" : ""}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {metric}
                  </span>
                  {index < 2 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-800"
                    }`}>
                      Growing
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold mb-1">
                  {[27, 14, 18, 5][index]}
                </div>
                <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {index < 2 ? "+3 last quarter" : ""}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Research Areas Section */}
        <section className="space-y-8">
          <div className="flex overflow-x-auto py-2 hideScrollbar">
            <div className="flex space-x-2">
              {researchTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-600 text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700"
                    : "bg-white shadow-lg"
                }`}
              >
                <div className={`h-32 flex items-center justify-center ${
                  isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                }`}>
                  <div className="text-center">
                    {area.icon}
                    <div className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {area.papers} Published Papers
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {area.title}
                  </h3>
                  <p className={`mb-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {area.description}
                  </p>
                  <button
                    className={`inline-flex items-center text-sm font-medium ${
                      isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    Explore research <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
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
              Notable Publications
            </h2>
            
            <div className="space-y-4">
              {publicationsList.map((publication, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"
                  } transition-colors`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 ${
                      isDarkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}>
                      <FileText size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        {publication.title}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {publication.authors} · {publication.journal} · {publication.year}
                      </p>
                    </div>
                  </div>
                  <button 
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "text-blue-400 hover:bg-blue-900/30" 
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                    aria-label="Download publication"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <button 
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  isDarkMode 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                View All Publications
              </button>
            </div>
          </div>
        </motion.section>

        {/* Research Opportunities Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg"
              : "bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl"
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
              Research Opportunities
            </h2>
            <p className="text-white text-lg mb-8">
              We welcome collaboration with researchers, institutions, and industry partners who share our 
              interests. We also offer opportunities for graduate students and postdoctoral researchers.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="font-semibold text-xl mb-4">For Researchers</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Collaborative research projects</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access to our virtual lab datasets</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="font-semibold text-xl mb-4">For Students</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Internship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Research assistantships</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="px-6 py-3 bg-white text-purple-700 hover:bg-gray-100 transition-colors rounded-lg font-medium">
                Collaborate With Us
              </button>
              <button className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white/10 transition-colors rounded-lg font-medium">
                View Open Positions
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

export default ResearchPage;