"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/SideBar";
import AimContent from "@/components/experiment/aim";
import OverviewContent from "@/components/experiment/overview";
import AlgorithmContent from "@/components/experiment/algorithm";
import ReferencesContent from "@/components/experiment/references";
import FurtherReadingsContent from "@/components/experiment/further-readings";
import PostTestContent from "@/components/experiment/post-test";
import FeedbackContent from "@/components/experiment/feedback";
import PretestContent from "@/components/experiment/pre-test";
import CodeAssessmentContent from "@/components/experiment/code-assessment";
import PracticeContent from "@/components/experiment/practice";
import OptimizationContent from "@/components/experiment/optimization";
import StabilityContent from "@/components/experiment/stability";
import ComplexityContent from "@/components/experiment/complexity";
import ComparisonContent from "@/components/experiment/comparison";

const ExperimentPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("aim");

  // Use system preference for initial theme
  useEffect(() => {
    // Check localStorage first for saved preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Fall back to system preference only if no saved preference
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Side navigation menu categories and items
  const sideNavCategories = [
    {
      title: "Getting Started",
      items: [
        { id: "aim", title: "Aim" },
        { id: "overview", title: "Overview" },
        { id: "pretest", title: "Pretest" },
      ],
    },
    {
      title: "Learning",
      items: [
        { id: "algorithm", title: "Algorithm" },
        { id: "stability", title: "Stability" },
        { id: "practice", title: "Practice" },
        { id: "optimization", title: "Optimization" },
        { id: "complexity", title: "Complexity Analysis" },
        { id: "comparison", title: "Comparison" },
      ],
    },
    {
      title: "Self-Assessment",
      items: [
        { id: "optimized-practice", title: "Practice" },
        { id: "optimized-exercise", title: "Exercise" },
        { id: "quiz", title: "Quiz" },
        { id: "code-assessment", title: "Code Assessment" },
        { id: "post-test", title: "Posttest" },
      ],
    },
    {
      title: "Additional Resources",
      items: [
        { id: "further-readings", title: "Further Readings" },
        { id: "references", title: "References" },
      ],
    },
    {
      title: "Feedback",
      items: [{ id: "feedback", title: "Feedback" }],
    },
  ];

  // Content for each section
  interface ContentSection {
    title: string;
    content: React.ReactNode;
  }

  const contentSections: { [key: string]: ContentSection } = {
    aim: {
      title: "Aim",
      content: <AimContent isDarkMode={isDarkMode} />,
    },
    overview: {
      title: "Overview",
      content: <OverviewContent isDarkMode={isDarkMode} />,
    },
    algorithm: {
      title: "Algorithm",
      content: <AlgorithmContent isDarkMode={isDarkMode} />,
    },
    pretest: {
      title: "Pretest",
      content: <PretestContent isDarkMode={isDarkMode} />,
    },
    practice: {
      title: "Practice",
      content: <PracticeContent isDarkMode={isDarkMode} />,
    },
    optimization: {
      title: "Optimization",
      content: <OptimizationContent isDarkMode={isDarkMode} />,
    },
    complexity: {
      title: "Complexity Analysis",
      content: <ComplexityContent isDarkMode={isDarkMode} />,
    },
    stability: {
      title: "Stability of Bubble Sort",
      content: <StabilityContent isDarkMode={isDarkMode} />,
    },
    comparison: {
      title: "Comparing Bubble Sort with Other Algorithms",
      content: <ComparisonContent isDarkMode={isDarkMode} />,
    },
    "post-test": {
      title: "Post Test",
      content: <PostTestContent isDarkMode={isDarkMode} />,
    },
    "code-assessment": {
      title: "Code Assessment",
      content: <CodeAssessmentContent isDarkMode={isDarkMode} />,
    },
    "further-readings": {
      title: "Further Readings",
      content: <FurtherReadingsContent isDarkMode={isDarkMode} />,
    },
    references: {
      title: "References",
      content: <ReferencesContent isDarkMode={isDarkMode} />,
    },
    feedback: {
      title: "Feedback",
      content: <FeedbackContent isDarkMode={isDarkMode} />,
    },
  };

  // Default to the first section if no matching content is found
  const getContentForSection = (sectionId: string) => {
    return contentSections[sectionId] || contentSections["onboarding-process"];
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentContent = getContentForSection(activeSection);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-200`}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 space-y-8 pb-16">
        <nav aria-label="Breadcrumb" className="py-1">
          <ol className="flex items-center space-x-3 text-lg ml-3">
            <li>
              <a
                href="/"
                className={`hover:underline ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </a>
            </li>
            <li
              className={`flex items-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li>
              <a
                href="/experiments"
                className={`hover:underline ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Experiments
              </a>
            </li>
            <li
              className={`flex items-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li>
              <a
                href="/experiment"
                className={`hover:underline font-medium ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                Bubble Sort
              </a>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
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
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Bubble Sort
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                Bubble sort is a simple algorithm that organizes a list of items
                in order by repeatedly comparing and swapping adjacent elements.
                It's also known as sinking sort.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Content Section with Sidebar Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <Sidebar
              categories={sideNavCategories}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div
              className={`p-6 md:p-8 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              } shadow-md`}
            >
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                id={activeSection}
              >
                {/* <h1 className="text-3xl font-bold mb-6">
                  {currentContent.title}
                </h1> */}
                {currentContent.content}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ExperimentPage;
