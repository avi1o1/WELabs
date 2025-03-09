'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from '@/components/layout/SideBar';

const ExperimentPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('aim');

  // Use system preference for initial theme
  useEffect(() => {
    if (window.matchMedia &&
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
      title: "Learning",
      items: [
        { id: "aim", title: "Aim" },
        { id: "overview", title: "Overview" },
        { id: "recap", title: "Recap" },
      ]
    },
    {
      title: "Testing",
      items: [
        { id: "authoring-environment", title: "VS Code Authoring Environment" },
        { id: "code-assessment", title: "Code Assessment Tool" },
        { id: "create-experiment-online", title: "Create Experiment Online" }
      ],
      buttons: [
        { id: "develop-online", title: "Develop Online", link: "http://virtual-labs-cms.netlify.app" }
      ]
    },
    {
      title: "See Also",
      items: [
        { id: "further-readings", title: "Further Readings" },
        { id: "references", title: "References" }
      ],
      buttons: [
        { id: "vlead-tech-blogs", title: "VLEAD Tech Blogs", link: "https://medium.com/vlead-tech" }
      ]
    }
  ];

  // Content for each section
  interface ContentSection {
    title: string;
    content: React.ReactNode;
  }

  const contentSections: { [key: string]: ContentSection } = {
    "aim": {
      title: "Aim",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Bubble Sort Algorithm</h2>

          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30">
            <h4 className="font-semibold text-black">Estimated Time</h4>
            <p className='text-black'>1 hour</p>
          </div>

          <h3 className="text-xl font-semibold mt-6">Learning Objectives of the Experiment</h3>
          <p>
            In this experiment, we will be able to do the following:
          </p>

          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>
              Given an unsorted array of numbers, generate a sorted array of numbers by applying Bubble Sort.
            </li>
            <li>
              Optimise the Bubble Sort algorithm to achieve better performance.
            </li>
            <li>
              Demonstrate knowledge of time complexity of Bubble Sort by counting the number of operations involved in each iteration.
            </li>
            <li>
              Compare Bubble Sort with other sorting algorithms and realise Bubble Sort as a stable comparison sorting algorithm.
            </li>
          </ul>

          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30 mt-8">
            <h4 className="font-semibold text-black">Note:</h4>
            <p className='text-black'>This experiment provides hands-on experience with the Bubble Sort algorithm, one of the fundamental sorting techniques in computer science.</p>
          </div>
        </div>
      )
    },
    "development-process": {
      title: "Development Process",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Virtual Labs Development Process</h2>
          <p>
            The development process outlines the methodology for creating high-quality virtual lab experiments.
            Following this process ensures that experiments meet educational goals while maintaining technical standards.
          </p>

          <h3 className="text-xl font-semibold mt-6">Planning Phase</h3>
          <p>
            Begin by defining clear learning objectives for the virtual experiment. Identify the target audience and
            required technical resources. Create a detailed storyboard outlining the experiment flow.
          </p>

          <h3 className="text-xl font-semibold mt-6">Design Phase</h3>
          <p>
            Develop UI mockups and interaction models. Design the experiment architecture and data flow.
            Plan accessibility features and responsive layouts for various devices.
          </p>

          <h3 className="text-xl font-semibold mt-6">Implementation Phase</h3>
          <p>
            Code the experiment following Virtual Labs coding standards. Implement the UI, simulation logic,
            and assessment components. Conduct unit testing throughout development.
          </p>

          <h3 className="text-xl font-semibold mt-6">Testing Phase</h3>
          <p>
            Perform comprehensive testing including functional testing, usability testing, and cross-browser testing.
            Validate that the experiment achieves its educational objectives.
          </p>

          <h3 className="text-xl font-semibold mt-6">Deployment Phase</h3>
          <p>
            Package the experiment for integration with the Virtual Labs platform. Create documentation for users
            and administrators. Submit for final review and deployment.
          </p>

          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30 mt-8">
            <h4 className="font-semibold">Resources:</h4>
            <ul className="list-disc ml-5 mt-2">
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Development Templates</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Coding Standards Guide</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">UI Component Library</a></li>
            </ul>
          </div>
        </div>
      )
    },
    "overview": {
      title: "Overview",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Virtual Labs Hosting Process</h2>
          <p>
            The hosting process describes how approved lab experiments are deployed and maintained on the
            Virtual Labs infrastructure.
          </p>

          <h3 className="text-xl font-semibold mt-6">Hosting Requirements</h3>
          <p>
            Before hosting, ensure your lab experiment meets these requirements:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>Code repository follows the standard Virtual Labs structure</li>
            <li>All dependencies are properly documented</li>
            <li>The experiment passes all quality assurance tests</li>
            <li>Documentation is complete and up-to-date</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Deployment Steps</h3>
          <p>
            The Virtual Labs team follows these steps to host your experiment:
          </p>
          <ol className="list-decimal ml-5 mt-2">
            <li>Repository verification and access setup</li>
            <li>Build pipeline configuration</li>
            <li>Staging deployment and testing</li>
            <li>Production deployment</li>
            <li>Integration with the Virtual Labs portal</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6">Maintenance and Updates</h3>
          <p>
            After hosting, labs are maintained through:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>Regular security updates</li>
            <li>Performance monitoring</li>
            <li>Content updates via pull requests</li>
            <li>Version tracking and release management</li>
          </ul>

          <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-900/30 mt-8">
            <h4 className="font-semibold">Important:</h4>
            <p>Changes to production experiments must follow the change management process and require approval
              before deployment.</p>
          </div>
        </div>
      )
    },
    "recap": {
      title: "Recap",
      content: (
        <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-900 space-y-8">

          {/* Main Heading */}
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Bubble Sort
          </h2>

          {/* Sorting Explanation */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              What is Sorting?
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Given a list of random numbers, <strong>sorting</strong> means ordering
              them in either ascending or descending order. By default, we sort numbers
              in ascending order.
            </p>
          </div>

          {/* How Bubble Sort Works */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              How Bubble Sort Works
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Compare each pair of adjacent elements in the list.</li>
              <li>Swap them if they are in the wrong order (e.g., descending instead of ascending).</li>
              <li>After each pass, the largest (or smallest) element “bubbles up” to its correct position.</li>
              <li>Repeat until the entire list is sorted.</li>
            </ul>
          </div>

          {/* Animated Unsorted vs Sorted Visualization */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              Unsorted and Sorted Arrays
            </h4>
            <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center md:space-x-8 space-y-6 md:space-y-0">

              {/* Unsorted SVG */}
              <div className="relative w-56 h-24">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 160 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* "Unsorted" circles in random positions */}
                  <circle
                    cx="20"
                    cy="40"
                    r="10"
                    fill="url(#grad1)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="80"
                    cy="20"
                    r="10"
                    fill="url(#grad2)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="140"
                    cy="60"
                    r="10"
                    fill="url(#grad3)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="100"
                    cy="40"
                    r="10"
                    fill="url(#grad4)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="50"
                    cy="55"
                    r="10"
                    fill="url(#grad5)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />

                  {/* Define gradient fills */}
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F87171" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                    <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#F87171" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Unsorted
                </p>
              </div>

              {/* Arrow Icon */}
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-600 hidden md:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>

              {/* Sorted SVG */}
              <div className="relative w-56 h-24">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 160 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* "Sorted" circles aligned on the same Y-axis */}
                  <circle
                    cx="20"
                    cy="40"
                    r="10"
                    fill="url(#grad1)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="50"
                    cy="40"
                    r="10"
                    fill="url(#grad2)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="80"
                    cy="40"
                    r="10"
                    fill="url(#grad3)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="110"
                    cy="40"
                    r="10"
                    fill="url(#grad4)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />
                  <circle
                    cx="140"
                    cy="40"
                    r="10"
                    fill="url(#grad5)"
                    className="transition-transform duration-300 hover:scale-110 drop-shadow-md"
                  />

                  {/* Same gradient defs for the sorted circles */}
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F87171" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                    <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#F87171" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Sorted
                </p>
              </div>
            </div>
          </div>

          {/* Time & Space Complexity */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              Time and Space Complexity
            </h4>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The <strong>time complexity</strong> of an algorithm gives the measure
              of time taken by it to run as a function of the length of the input.
              Similarly, the <strong>space complexity</strong> quantifies the amount
              of memory an algorithm needs. For example, if our input array has{" "}
              <em>N</em> elements and the algorithm iterates through it once, we have{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                O(N)
              </code>
              . If we run two embedded loops over <em>N</em> elements, it becomes{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                O(N<sup>2</sup>)
              </code>
              .
            </p>
          </div>

        </div>
      )
    },
    "further-readings": {
      title: "Further Readings",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Bubble Sort Algorithm</h2>

          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30">
            <h4 className="font-semibold text-black">Estimated Time</h4>
            <p className='text-black'>1 hour</p>
          </div>

          <h3 className="text-xl font-semibold mt-6">Learning Objectives of the Experiment</h3>
          <p>
            In this experiment, we will be able to do the following:
          </p>

          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>
              Given an unsorted array of numbers, generate a sorted array of numbers by applying Bubble Sort.
            </li>
            <li>
              Optimise the Bubble Sort algorithm to achieve better performance.
            </li>
            <li>
              Demonstrate knowledge of time complexity of Bubble Sort by counting the number of operations involved in each iteration.
            </li>
            <li>
              Compare Bubble Sort with other sorting algorithms and realise Bubble Sort as a stable comparison sorting algorithm.
            </li>
          </ul>

          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30 mt-8">
            <h4 className="font-semibold text-black">Note:</h4>
            <p className='text-black'>This experiment provides hands-on experience with the Bubble Sort algorithm, one of the fundamental sorting techniques in computer science.</p>
          </div>
        </div>
      )
    },
    "further-readings": {
      title: "Further Readings",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Bubble Sort Algorithm</h2>

          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30">
            <h4 className="font-semibold text-black">Estimated Time</h4>
            <p className='text-black'>1 hour</p>
          </div>

          <h3 className="text-xl font-semibold mt-6">Learning Objectives of the Experiment</h3>
          <p>
            In this experiment, we will be able to do the following:
          </p>

          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>
              Given an unsorted array of numbers, generate a sorted array of numbers by applying Bubble Sort.
            </li>
            <li>
              Optimise the Bubble Sort algorithm to achieve better performance.
            </li>
            <li>
              Demonstrate knowledge of time complexity of Bubble Sort by counting the number of operations involved in each iteration.
            </li>
            <li>
              Compare Bubble Sort with other sorting algorithms and realise Bubble Sort as a stable comparison sorting algorithm.
            </li>
          </ul>

          <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/30 mt-8">
            <h4 className="font-semibold text-black">Note:</h4>
            <p className='text-black'>This experiment provides hands-on experience with the Bubble Sort algorithm, one of the fundamental sorting techniques in computer science.</p>
          </div>
        </div>
      )
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 space-y-8 pb-16">
        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-xl relative"
        >
          <div className={`${isDarkMode
            ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900'
            : 'bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600'
            } text-white`}>
            <div className="absolute inset-0 overflow-hidden">
              <svg className="absolute -right-10 -top-20 w-96 h-96 text-white opacity-10" viewBox="0 0 200 200" fill="currentColor">
                <path d="M44.5,-76.3C56.6,-69.3,64.8,-54.1,71.4,-39.1C78.1,-24.1,83.2,-9.3,81.2,4.7C79.1,18.7,69.9,31.9,59.1,42.4C48.2,53,35.5,60.9,21.7,66.1C7.8,71.3,-7.2,73.8,-20.8,70.3C-34.4,66.9,-46.6,57.4,-55.9,45.6C-65.2,33.7,-71.7,19.5,-74.7,3.9C-77.7,-11.7,-77.2,-28.6,-68.7,-40C-60.2,-51.4,-43.8,-57.3,-28.9,-63.5C-14.1,-69.7,0.1,-76.2,15.2,-78.9C30.4,-81.6,48.4,-80.5,51.4,-76.2C54.3,-72,44.4,-54.7,44.5,-76.3Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="p-8 md:p-16 relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Bubble Sort Experiment
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-3xl">
                Bubble sort is a simple algorithm that organizes a list of items in order by repeatedly comparing and
                swapping adjacent elements. It's also known as sinking sort.
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
            <div className={`p-6 md:p-8 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
              } shadow-md`}>
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                id={activeSection}
              >
                <h1 className="text-3xl font-bold mb-6">{currentContent.title}</h1>
                {currentContent.content}
              </motion.div>
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