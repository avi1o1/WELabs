"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, Menu, X, ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VLabsHomePage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use system preference for initial theme
  useEffect(() => {
    // Check localStorage first for saved preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Fall back to system preference only if no saved preference
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        { title: "a Creator", link: "/development" },
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

  // Data for activities cards
  const activities = [
    {
      title: "Development and Hosting",
      description:
        "Create and host virtual lab experiments using our platform.",
      image: "/images/development.png",
      link: "/development",
    },
    {
      title: "Outreach",
      description: "Engage with the community and promote virtual learning.",
      image: "/images/outreach.png",
      link: "/outreach",
    },
    {
      title: "Research",
      description:
        "Explore cutting-edge virtual learning research initiatives.",
      image: "/images/research.png",
      link: "/research",
    },
  ];

  // Data for explore cards
  const exploreLinks = [
    {
      title: "Virtual Labs FAQ",
      description: "Find answers to common questions about Virtual Labs.",
      image: "https://i.imgur.com/ZhFf5SE.jpg",
      link: "/faq",
    },
    {
      title: "Workshop FAQ",
      description: "Learn about hosting and participating in workshops.",
      image: "https://i.imgur.com/on7M1R7.jpg",
      link: "/outreach/#faq",
    },
    {
      title: "Analytics",
      description: "Explore usage statistics and performance metrics.",
      image: "https://i.imgur.com/j0UDVdv.jpg",
      link: "/summary/",
    },
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
      <main className="container mx-auto pt-24 px-4 space-y-24 pb-16">
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
              <svg
                className="absolute -left-20 -bottom-20 w-96 h-96 text-white opacity-10"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                <path
                  d="M33.3,-54.1C43.9,-48.7,53.6,-40.6,59.6,-30C65.5,-19.4,67.8,-6.4,67.3,6.8C66.8,19.9,63.5,33.2,55.3,43.1C47.1,53,34.1,59.5,20.6,63.7C7.1,68,-7,70,-19.3,66.7C-31.6,63.4,-42.2,54.9,-51.3,44.5C-60.5,34.1,-68.2,21.8,-72,8C-75.8,-5.8,-75.8,-21,-69.8,-33.2C-63.9,-45.5,-52,-54.8,-39.1,-59.2C-26.3,-63.6,-12.3,-63,-0.1,-62.8C12.1,-62.5,22.7,-59.5,33.3,-54.1Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="p-8 md:p-16 relative z-10">
              <div className="grid md:grid-cols-5 gap-10">
                <div className="md:col-span-3 space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Explore, Experiment <br className="hidden md:block" />
                    and Discover
                  </h1>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-100">
                    The Virtual Labs Engineering, Architecture, and Design
                    (VLEAD) Team optimizes operations to ensure efficiency and
                    deliver a seamless learning experience through cutting-edge
                    technology.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-6">
                    <a
                      href="/experiments/"
                      className="px-8 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                    >
                      Start Learning
                    </a>
                    <a
                      href="/development/"
                      className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-purple-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Create Experiments
                    </a>
                  </div>
                </div>
                <div className="md:col-span-2 flex items-center justify-center">
                  <img
                    src="/images/home.png"
                    alt="Virtual Labs"
                    className="max-h-64 md:max-h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Activities Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Activities
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Explore the various activities and initiatives offered by Virtual
              Labs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
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
                <div className="h-52 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {activity.title}
                  </h3>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {activity.description}
                  </p>
                  <a
                    href={activity.link}
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

        {/* Explore Further Section */}
        <section
          className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${
            isDarkMode
              ? "bg-gradient-to-r from-green-900 to-teal-900 shadow-lg"
              : "bg-gradient-to-r from-green-500 to-teal-500 shadow-xl"
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
                d="M37.9,-65.8C47.4,-58.6,52.5,-44.7,59.7,-31.9C66.9,-19,76.1,-7.1,77.4,5.8C78.7,18.8,72,32.8,62.3,43.1C52.5,53.5,39.8,60.1,26.5,64.3C13.3,68,-0.5,70.2,-14.7,68.5C-28.9,67.9,-44.5,65.4,-57.7,57.5C-70.8,49.7,-81.3,36.4,-85.6,21.4C-90,6.3,-88.3,-10.6,-81.4,-24.1C-74.5,-37.7,-62.6,-47.9,-49.3,-54.3C-36,-60.7,-21.5,-63.3,-7.8,-60.9C6,-58.5,25.1,-66.3,34.6,-59.3Z"
                transform="translate(100 100)"
              />
            </svg>
            <svg
              className="absolute -left-16 -top-16 w-96 h-96 text-white opacity-10"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path
                d="M34.6,-59.3C44.1,-52.2,50.8,-41.5,58.1,-30.1C65.3,-18.8,73.2,-6.8,73.2,5.2C73.3,17.3,65.6,29.3,56.5,39.5C47.3,49.7,36.7,58.1,24.9,62.9C13.1,67.8,0.2,69.1,-14.2,68.5C-28.6,67.9,-44.5,65.4,-57.7,57.5C-70.8,49.7,-81.3,36.4,-85.6,21.4C-90,6.3,-88.3,-10.6,-81.4,-24.1C-74.5,-37.7,-62.6,-47.9,-49.3,-54.3C-36,-60.7,-21.5,-63.3,-7.8,-60.9C6,-58.5,25.1,-66.3,34.6,-59.3Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Explore Further
            </h2>
            <p className="mt-3 text-gray-100 text-lg max-w-2xl mx-auto">
              Discover additional resources and information about Virtual Labs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {exploreLinks.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col rounded-xl overflow-hidden bg-white/95 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all group h-full"
              >
                <div className="h-44 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 group-hover:opacity-80 transition-opacity"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <h3 className="absolute bottom-4 left-4 z-20 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-gray-700">{item.description}</p>
                </div>
                <div className="px-6 pb-5 pt-2 mt-auto">
                  <span className="inline-flex items-center font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                    Learn more{" "}
                    <ArrowRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer isDarkMode={false} />
    </div>
  );
};

export default VLabsHomePage;
