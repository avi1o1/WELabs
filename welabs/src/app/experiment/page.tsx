"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, Menu, X, ArrowRight, ChevronDown, ChevronRight, Info, BookOpen, Code, BarChart2, Layers } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
   
const ExperimentPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDifficulty, setCurrentDifficulty] = useState<string[]>(["Beginner", "Advanced"]);
  const [expandedSection, setExpandedSection] = useState<string | null>("bubble-sort");

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

  // Toggle difficulty selection
  const toggleDifficulty = (difficulty: string) => {
    if (currentDifficulty.includes(difficulty)) {
      setCurrentDifficulty(currentDifficulty.filter(d => d !== difficulty));
    } else {
      setCurrentDifficulty([...currentDifficulty, difficulty]);
    }
  };

  // Dummy quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is an array?",
      options: [
        { id: "a", text: "a: [1, 4, 3, 10]" },
        { id: "b", text: "b: ['A', 3, 0, \"Hello world\"]" },
        { id: "c", text: "c: [\"Test\", False, 'x', \"hi\"]" },
        { id: "d", text: "d: [True, False, 6, 2.5]" }
      ],
      correct: "a"
    },
    {
      id: 2,
      question: "Which of the following is an array sorted in ascending order?",
      options: [
        { id: "a", text: "a: 1, 4, 5, -10" },
        { id: "b", text: "b: -10, -13, 15, 100" },
        { id: "c", text: "c: -1000, 0, 14, 27" },
        { id: "d", text: "d: 100, 50, 10, 0" }
      ],
      correct: "c"
    },
    {
      id: 3,
      question: "Which of the following is not a sorting algorithm?",
      options: [
        { id: "a", text: "a: Bubble" },
        { id: "b", text: "b: Selection" },
        { id: "c", text: "c: Merge" },
        { id: "d", text: "d: Binary" }
      ],
      correct: "d"
    },
    {
      id: 4,
      question: "Consider the following array: A = [-1, 9, 4, 8] Identify A[2], i.e, the element with index 2 from the following (assume 0-indexed array).",
      options: [
        { id: "a", text: "a: -1" },
        { id: "b", text: "b: 9" },
        { id: "c", text: "c: 4" },
        { id: "d", text: "d: 8" }
      ],
      correct: "c"
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      {/* Breadcrumb */}
      <div className={`border-b pt-20 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <a href="#" className={`${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}>
              Computer Science and Engineering
            </a>
            <ChevronRight size={16} className="mx-2 text-gray-500" />
            <a href="#" className={`${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}>
              Data Structures - 1
            </a>
            <ChevronRight size={16} className="mx-2 text-gray-500" />
            <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Experiments</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Component */}
          <Sidebar isMenuOpen={isMenuOpen} isDarkMode={isDarkMode } />

          {/* Main content area */}
          <div className="flex-1">
            <div className={`rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"} p-6`}>
              {/* Title area */}
              <h1 className="text-3xl font-bold mb-6">Bubble Sort</h1>

              {/* Difficulty selection */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Choose difficulty:</h2>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded text-blue-600 h-5 w-5"
                      checked={currentDifficulty.includes("Beginner")}
                      onChange={() => toggleDifficulty("Beginner")}
                    />
                    <span className="ml-2">Beginner</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded text-blue-600 h-5 w-5"
                      checked={currentDifficulty.includes("Advanced")}
                      onChange={() => toggleDifficulty("Advanced")}
                    />
                    <span className="ml-2">Advanced</span>
                  </label>
                </div>
              </div>

              {/* Quiz content */}
              <div className="space-y-8">
                {quizQuestions.map((question) => (
                  <div key={question.id} className={`rounded-lg p-5 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-medium mb-4">
                      {question.id}. {question.question}
                    </h3>
                    <div className="space-y-3 pl-6">
                      {question.options.map((option) => (
                        <label key={option.id} className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.id}
                            className="mt-1 form-radio text-blue-600"
                          />
                          <span className="ml-2">{option.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination/Navigation buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors`}
                >
                  Previous
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } transition-colors`}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Rating and feedback */}
            <div className={`mt-6 p-4 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="mr-3">Rate this experiment:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-yellow-400 focus:outline-none">
                        <svg
                          className="w-6 h-6"
                          fill={star <= 4 ? "currentColor" : "none"}
                          stroke="cu  rrentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          ></path>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    } transition-colors`}
                  >
                    Rate Me
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors`}
                  >
                    Report a Bug
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExperimentPage;