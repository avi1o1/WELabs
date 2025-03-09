"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText, BarChart2, PieChart } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DetailedAnalysisPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("usage");

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

  // Analytics categories
  const analyticsTabs = [
    { id: "usage", label: "Usage Analytics" },
    { id: "performance", label: "Performance Metrics" },
    { id: "engagement", label: "Engagement Data" },
    { id: "geographic", label: "Geographic Distribution" },
  ];

  // Sample chart data
  const chartTypes = [
    {
      title: "Monthly Active Users",
      description: "Track user engagement over time across all virtual labs",
      icon: <BarChart2 className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={24} />,
      type: "line"
    },
    {
      title: "Experiment Popularity",
      description: "Most frequently accessed experiments across disciplines",
      icon: <PieChart className={isDarkMode ? "text-purple-400" : "text-purple-600"} size={24} />,
      type: "pie"
    },
    {
      title: "User Session Duration",
      description: "Average time spent on each virtual lab experiment",
      icon: <BarChart2 className={isDarkMode ? "text-green-400" : "text-green-600"} size={24} />,
      type: "bar"
    }
  ];

  // Sample reports
  const reportsList = [
    { 
      title: "Annual Impact Report 2024",
      size: "3.4 MB",
      date: "March 1, 2024",
      type: "PDF"
    },
    { 
      title: "Quarterly User Analytics Q1 2024",
      size: "2.1 MB",
      date: "April 15, 2024",
      type: "XLSX"
    },
    { 
      title: "Experiment Performance Metrics",
      size: "1.8 MB",
      date: "February 23, 2024",
      type: "PDF"
    },
    { 
      title: "Geographic Distribution Analysis",
      size: "4.2 MB",
      date: "January 10, 2024",
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
                ? "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"
                : "bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600"
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
                Detailed Analytics
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                In-depth analysis of Virtual Labs usage, performance, and impact metrics. 
                Explore comprehensive data visualizations and download detailed reports.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Analytics Overview */}
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
              Analytics Dashboard
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Explore key metrics about virtual lab usage and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Users", "Sessions", "Experiments", "Institutions"].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className={`rounded-xl p-6 ${
                  isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-md"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    Total {metric}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-800"
                  }`}>
                    +{Math.floor(Math.random() * 20) + 5}%
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {(Math.floor(Math.random() * 900000) + 100000).toLocaleString()}
                </div>
                <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Last updated: Today
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Data Visualization Section */}
        <section className="space-y-8">
          <div className="flex overflow-x-auto py-2 hideScrollbar">
            <div className="flex space-x-2">
              {analyticsTabs.map((tab) => (
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
            {chartTypes.map((chart, index) => (
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
                <div className={`h-48 flex items-center justify-center ${
                  isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                }`}>
                  <div className="text-center">
                    {chart.icon}
                    <div className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} Chart
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {chart.title}
                  </h3>
                  <p className={`mb-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {chart.description}
                  </p>
                  <button
                    className={`inline-flex items-center text-sm font-medium ${
                      isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    View detailed data <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Reports Section */}
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
              Detailed Reports
            </h2>
            
            <div className="space-y-4">
              {reportsList.map((report, index) => (
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
                        {report.title}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {report.size} · {report.type} · {report.date}
                      </p>
                    </div>
                  </div>
                  <button 
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "text-blue-400 hover:bg-blue-900/30" 
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                    aria-label="Download report"
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
                Generate Custom Report
              </button>
            </div>
          </div>
        </motion.section>

        {/* Comparison Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-3xl p-8 md:p-12 overflow-hidden relative ${
            isDarkMode
              ? "bg-gradient-to-r from-green-900 to-blue-900 shadow-lg"
              : "bg-gradient-to-r from-green-500 to-blue-500 shadow-xl"
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
              Year-over-Year Comparison
            </h2>
            <p className="text-white text-lg mb-8">
              Analyze growth trends and performance changes compared to previous years.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="text-2xl font-bold mb-1">+143%</p>
                <p className="font-medium">User Growth</p>
                <p className="text-sm text-gray-200 mt-2">Compared to last year</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="text-2xl font-bold mb-1">+87%</p>
                <p className="font-medium">Session Duration</p>
                <p className="text-sm text-gray-200 mt-2">Compared to last year</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white">
                <p className="text-2xl font-bold mb-1">+215%</p>
                <p className="font-medium">New Institutions</p>
                <p className="text-sm text-gray-200 mt-2">Compared to last year</p>
              </div>
            </div>

            <button className="mt-8 px-6 py-3 bg-white text-blue-700 hover:bg-gray-100 transition-colors rounded-lg font-medium">
              View Complete Comparison
            </button>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default DetailedAnalysisPage;