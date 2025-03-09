"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const VLEADPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VLEAD Portal</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Virtual Labs Engineering and Architecture Division (VLEAD)
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p className="lead text-lg text-gray-700 dark:text-gray-300">
              Welcome to the Virtual Labs Engineering and Architecture Division (VLEAD) portal. 
              VLEAD is responsible for the design, development, and maintenance of the Virtual Labs platform.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              To create a sustainable ecosystem for the development, deployment, and maintenance of
              virtual labs that provide students with remote access to laboratories in various disciplines
              of science and engineering.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">
              Key Responsibilities
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Developing and maintaining the Virtual Labs platform architecture</li>
              <li>Creating standards and best practices for virtual lab development</li>
              <li>Providing tools and frameworks for lab experiment creation</li>
              <li>Supporting lab developers with technical guidance and resources</li>
              <li>Ensuring accessibility and scalability of the platform</li>
              <li>Conducting research to enhance the virtual lab experience</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">
              Available Resources
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-blue-50 dark:bg-blue-900/30">
                <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Development Tools</h4>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  Access frameworks, templates, and tools for creating virtual lab experiments.
                </p>
                <Link href="/resources/development" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Explore Development Resources →
                </Link>
              </div>
              
              <div className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-green-50 dark:bg-green-900/30">
                <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Documentation</h4>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  Browse comprehensive guides, API documentation, and best practices.
                </p>
                <Link href="/resources/documentation" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  View Documentation →
                </Link>
              </div>
              
              <div className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-purple-50 dark:bg-purple-900/30">
                <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Training Materials</h4>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  Learn how to create effective virtual experiments with our training resources.
                </p>
                <Link href="/resources/training" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Start Learning →
                </Link>
              </div>
              
              <div className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-yellow-50 dark:bg-yellow-900/30">
                <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Community Support</h4>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  Connect with other lab developers and get help from the VLEAD community.
                </p>
                <Link href="/community" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Join the Community →
                </Link>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">
              Getting Started
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              New to VLEAD? Here's how you can get started:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Browse our <Link href="/documentation" className="text-blue-600 dark:text-blue-400 hover:underline">documentation</Link> to understand the platform</li>
              <li>Check out <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline">sample experiments</Link> to see what's possible</li>
              <li>Set up your <Link href="/development-environment" className="text-blue-600 dark:text-blue-400 hover:underline">development environment</Link></li>
              <li>Follow our <Link href="/tutorials" className="text-blue-600 dark:text-blue-400 hover:underline">step-by-step tutorial</Link> to create your first experiment</li>
            </ol>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg mt-10">
              <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Need Help?</h4>
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions or need assistance, feel free to reach out to our team at{" "}
                <a href="mailto:support@vlabs.ac.in" className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@vlabs.ac.in
                </a>{" "}
                or join our weekly developer office hours.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Virtual Labs Engineering and Architecture Division. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VLEADPage;