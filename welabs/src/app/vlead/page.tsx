"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Book, Code, Users, FileText } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VLEADPage: React.FC = () => {
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

  // Resources data
  const resources = [
    {
      title: "Development Tools",
      description: "Access frameworks, templates, and tools for creating virtual lab experiments.",
      color: "bg-blue-50 dark:bg-blue-900/30",
      link: "/resources/development",
      linkText: "Explore Development Resources",
      icon: <Code size={24} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />
    },
    {
      title: "Documentation",
      description: "Browse comprehensive guides, API documentation, and best practices.",
      color: "bg-green-50 dark:bg-green-900/30",
      link: "/resources/documentation",
      linkText: "View Documentation",
      icon: <Book size={24} className={isDarkMode ? "text-green-400" : "text-green-600"} />
    },
    {
      title: "Training Materials",
      description: "Learn how to create effective virtual experiments with our training resources.",
      color: "bg-purple-50 dark:bg-purple-900/30",
      link: "/resources/training",
      linkText: "Start Learning",
      icon: <FileText size={24} className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
    },
    {
      title: "Community Support",
      description: "Connect with other lab developers and get help from the VLEAD community.",
      color: "bg-yellow-50 dark:bg-yellow-900/30",
      link: "/community",
      linkText: "Join the Community",
      icon: <Users size={24} className={isDarkMode ? "text-yellow-400" : "text-yellow-600"} />
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
                ? "bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900"
                : "bg-gradient-to-br from-indigo-600 via-blue-500 to-teal-500"
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
                Virtual Labs Engineering and Architecture Division
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                VLEAD is responsible for the design, development, and maintenance of the 
                Virtual Labs platform, creating sustainable ecosystems for virtual learning.
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
              Creating sustainable ecosystems for remote lab access in education
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
              To create a sustainable ecosystem for the development, deployment, and maintenance of
              virtual labs that provide students with remote access to laboratories in various disciplines
              of science and engineering.
            </p>
            
            <div className="mt-8">
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Key Responsibilities
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Developing and maintaining the Virtual Labs platform architecture",
                  "Creating standards and best practices for virtual lab development",
                  "Providing tools and frameworks for lab experiment creation",
                  "Supporting lab developers with technical guidance and resources",
                  "Ensuring accessibility and scalability of the platform",
                  "Conducting research to enhance the virtual lab experience"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className={`w-5 h-5 mr-2 mt-1 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
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

        {/* Resources Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Available Resources
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Tools and materials to support virtual lab development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
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
                <div className={`p-8 ${isDarkMode ? resource.color.split(" ")[1] : resource.color.split(" ")[0]}`}>
                  <div className="flex items-center mb-4">
                    {resource.icon}
                    <h3
                      className={`text-xl font-semibold ml-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {resource.title}
                    </h3>
                  </div>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {resource.description}
                  </p>
                  <Link
                    href={resource.link}
                    className={`inline-flex items-center font-medium transition-colors ${
                      isDarkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    {resource.linkText} <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Getting Started Section */}
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
              Getting Started
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              New to VLEAD? Here's how you can get started:
            </p>
            
            <div className="mt-6 space-y-4">
              {[
                { 
                  text: "Browse our documentation to understand the platform", 
                  link: "/documentation" 
                },
                { 
                  text: "Check out sample experiments to see what's possible", 
                  link: "/experiments" 
                },
                { 
                  text: "Set up your development environment", 
                  link: "/development-environment" 
                },
                { 
                  text: "Follow our step-by-step tutorial to create your first experiment", 
                  link: "/tutorials" 
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                    isDarkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-600"
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                      {step.text.split(" ").slice(0, -1).join(" ")} {" "}
                      <Link href={step.link} className={`font-medium ${
                        isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
                      }`}>
                        {step.text.split(" ").pop()}
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Help Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg"
              : "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-xl"
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
              Need Help?
            </h2>
            <p className="text-white text-lg mb-6">
              If you have questions or need assistance, feel free to reach out to our team or 
              join our weekly developer office hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:support@vlabs.ac.in" 
                className="px-6 py-3 bg-white text-blue-700 hover:bg-gray-100 transition-colors rounded-lg font-medium"
              >
                Email Support
              </a>
              <button className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white/10 transition-colors rounded-lg font-medium">
                Join Office Hours
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

export default VLEADPage;