"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/SideBar";
import AimContent from "@/components/experiment/aim";
import OverviewContent from "@/components/experiment/overview";
import ConceptContent from "@/components/experiment/concept";
import ReferencesContent from "@/components/experiment/references";
import FurtherReadingsContent from "@/components/experiment/further-readings";
import PostTestContent from "@/components/experiment/post-test";
import FeedbackContent from "@/components/experiment/feedback";
import PretestContent from "@/components/experiment/pre-test";
import CodeAssessmentContent from "@/components/experiment/code-assessment";

const ExperimentPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("aim");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      title: "Bubble Sort",
      items: [
        { id: "concept", title: "Concept" },
        { id: "bubble-sort-concept", title: "Concept" },
        { id: "bubble-sort-algorithm", title: "Algorithm" },
        { id: "bubble-sort-demo", title: "Demo" },
        { id: "optimized-technique", title: "Optimization Technique" },
      ],
    },
    // {
    //   title: "Optimized Bubble Sort",
    //   items: [
    //     { id: "optimized-demo", title: "Demo" },
    //     { id: "optimized-quiz", title: "Quiz" },
    //   ],
    // },
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
      title: "Analysis",
      items: [
        { id: "analysis-complexity", title: "Time and Space Complexity" },
        {
          id: "analysis-comparison",
          title: "Stability/Comparison with other Algorithms",
        },
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
    concept: {
      title: "Concept",
      content: <ConceptContent isDarkMode={isDarkMode} />,
    },
    pretest: {
      title: "Pretest",
      content: <PretestContent isDarkMode={isDarkMode} />,
    },
    "bubble-sort-concept": {
      title: "Bubble Sort - Concept",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            Demonstration of Bubble Sort Concept
          </h2>

          {/* Hero Section with Video */}
          <div
            className={`rounded-xl overflow-hidden ${
              isDarkMode
                ? "bg-gradient-to-br from-indigo-900 via-purple-950 to-blue-900"
                : "bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50"
            }`}
          >
            <div className="relative p-6 md:p-8">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2
                  className={`text-3xl font-bold mb-5 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Bubble Sort
                </h2>

                <div className="rounded-lg overflow-hidden shadow-lg mb-6 aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/ph-C6sUyzE4?si=gAYhBlJkxkrHVFjT"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg">
            Bubble Sort is one of the simplest sorting algorithms. While it's
            not efficient for large datasets, its step-by-step comparison and
            swapping make it an excellent tool for understanding basic sorting.
          </p>

          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold">Visualization</h3>
            <p className="mt-2">
              Picture an array of numbers where each adjacent pair is compared
              and swapped if the left number is greater than the right. With
              each pass, the largest unsorted element "bubbles up" to its
              correct position.
            </p>
            <div className="mt-4 flex justify-center">
              {/* Replace the src with your actual visualization image or animation */}
              <img
                src="/images/bubble-sort-visualization.png"
                alt="Bubble Sort Visualization"
                className="w-64 h-64 object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Figure: Visual representation of the Bubble Sort algorithm.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-4">
              How Bubble Sort Works
            </h3>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Start at the beginning of the array.</li>
              <li>Compare the first two elements.</li>
              <li>
                If the first element is larger than the second, swap them.
              </li>
              <li>
                Move to the next pair and repeat the comparison and swap if
                necessary.
              </li>
              <li>
                After completing one full pass, the largest element finds its
                correct position at the end.
              </li>
              <li>
                Repeat the process for the remaining unsorted portion until the
                entire array is sorted.
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-4">
              Important Observations
            </h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                After the first pass, the largest element is at its correct
                (last) position.
              </li>
              <li>
                Each subsequent pass moves the next largest element into its
                right position.
              </li>
              <li>
                The algorithm is stable and sorts in-place without requiring
                extra memory.
              </li>
              <li>
                Its worst-case time complexity is O(n²), making it inefficient
                on large lists.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-4">
              Step-by-Step Process for One Iteration
            </h3>
            <p className="mt-2">
              Let’s examine one iteration on the array [5, 3, 8, 4, 2]:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>
                <strong>Compare 5 and 3:</strong> Swap to get [3, 5, 8, 4, 2].
              </li>
              <li>
                <strong>Compare 5 and 8:</strong> No swap; the array remains [3,
                5, 8, 4, 2].
              </li>
              <li>
                <strong>Compare 8 and 4:</strong> Swap to get [3, 5, 4, 8, 2].
              </li>
              <li>
                <strong>Compare 8 and 2:</strong> Swap to get [3, 5, 4, 2, 8].
              </li>
            </ol>
            <p className="mt-2">
              Now, the largest element (8) is in its proper position. The
              algorithm will then repeat these steps for the remaining elements.
            </p>
          </div>
        </div>
      ),
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
                <h1 className="text-3xl font-bold mb-6">
                  {currentContent.title}
                </h1>
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
