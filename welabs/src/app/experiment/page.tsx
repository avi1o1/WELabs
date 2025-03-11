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
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">
            Comparing Bubble Sort with Other Algorithms
          </h1>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="mb-4">
              While Bubble Sort is simple to understand and implement, it's
              important to compare it with other sorting algorithms to
              understand when it might be appropriate to use and when other
              algorithms would be more efficient.
            </p>
            <p>
              The following comparisons analyze bubble sort against other common
              sorting algorithms across multiple parameters including time
              complexity, space complexity, stability, and practical use cases.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Graphical Comparison of Time Complexity
            </h2>
            <div className="flex justify-center mb-6">
              <img
                src="/images/sorting-complexity-comparison.png"
                alt="Sorting Algorithms Complexity Comparison"
                className="max-w-full h-auto border border-gray-200 rounded-md shadow-sm"
              />
            </div>
            <p className="text-sm text-center text-gray-600 mb-4">
              Graph showing time complexity comparison of Bubble Sort with other
              sorting algorithms
            </p>
            <p className="italic text-gray-700">
              Notice how Bubble Sort (red line) performs worse than other
              algorithms as the input size increases.
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Time Complexity Comparison
            </h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3">
                    Algorithm
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    Best Case
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    Average Case
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    Worst Case
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Bubble Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    O(n){" "}
                    <span className="text-gray-500 text-sm">(optimized)</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Selection Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Insertion Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">O(n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Merge Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Quick Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">
                    O(n²)
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Heap Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(n log n)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Radix Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(nk)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(nk)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">
                    O(nk)
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm mt-2 text-gray-600">
              <span className="inline-block w-3 h-3 bg-red-50 mr-1 border border-gray-300"></span>{" "}
              Higher complexity (slower)
              <span className="inline-block w-3 h-3 bg-green-50 ml-4 mr-1 border border-gray-300"></span>{" "}
              Lower complexity (faster)
              <br />
              <span className="italic">
                n = input size, k = number of digits in largest number (for
                Radix Sort)
              </span>
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Space Complexity and Other Properties
            </h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3">
                    Algorithm
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    Space Complexity
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    Stability
                  </th>
                  <th className="border border-gray-300 px-4 py-3">In-Place</th>
                  <th className="border border-gray-300 px-4 py-3">Adaptive</th>
                  <th className="border border-gray-300 px-4 py-3">Online</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Bubble Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Selection Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Insertion Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Merge Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">O(n)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Quick Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">O(log n)</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Heap Sort
                  </td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">
                    Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">
                    No
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="text-sm text-gray-700">
                <p>
                  <strong>In-Place:</strong> Algorithm sorts the array without
                  requiring significant extra space
                </p>
                <p>
                  <strong>Stable:</strong> Preserves relative order of equal
                  elements
                </p>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Adaptive:</strong> Takes advantage of existing order
                  in its input
                </p>
                <p>
                  <strong>Online:</strong> Can process its input piece-by-piece
                  without having the entire input available from the start
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">
                Practical Performance
              </h2>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">
                  Average execution times (ms)
                </h3>
                <div className="h-64 bg-gray-50 border border-gray-200 rounded-md p-2 mb-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Bar chart showing execution times for different algorithms
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  Measured on arrays of 10,000 random integers
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2">
                        Algorithm
                      </th>
                      <th className="border border-gray-300 px-3 py-2">
                        1K elements
                      </th>
                      <th className="border border-gray-300 px-3 py-2">
                        10K elements
                      </th>
                      <th className="border border-gray-300 px-3 py-2">
                        100K elements
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">
                        Bubble Sort
                      </td>
                      <td className="border border-gray-300 px-3 py-2">25ms</td>
                      <td className="border border-gray-300 px-3 py-2">
                        2,500ms
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        250,000ms
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">
                        Quick Sort
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        0.5ms
                      </td>
                      <td className="border border-gray-300 px-3 py-2">6ms</td>
                      <td className="border border-gray-300 px-3 py-2">80ms</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">
                        Merge Sort
                      </td>
                      <td className="border border-gray-300 px-3 py-2">1ms</td>
                      <td className="border border-gray-300 px-3 py-2">12ms</td>
                      <td className="border border-gray-300 px-3 py-2">
                        150ms
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h2 className="text-xl font-semibold mb-4">
                When to Use Bubble Sort
              </h2>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2 text-green-700">
                  Advantages
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Simple implementation</li>
                  <li>Works well for very small datasets</li>
                  <li>Stable sort - preserves order of equal elements</li>
                  <li>In-place algorithm - requires minimal extra space</li>
                  <li>Good teaching tool to introduce sorting concepts</li>
                  <li>Works well for arrays that are nearly sorted</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2 text-red-700">
                  Disadvantages
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Very inefficient for large datasets</li>
                  <li>O(n²) time complexity even with optimizations</li>
                  <li>Performs many more swaps than other algorithms</li>
                  <li>Not suitable for production code with large inputs</li>
                  <li>Gets dramatically slower as input size increases</li>
                </ul>
              </div>

              <div className="p-4 bg-white rounded-md border border-amber-200 mt-4">
                <h3 className="text-md font-medium mb-2">Best Use Cases</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Educational purposes</li>
                  <li>Tiny arrays (less than 10 elements)</li>
                  <li>Nearly sorted arrays with few inversions</li>
                  <li>When simplicity is more important than efficiency</li>
                  <li>When memory usage is extremely constrained</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              Case Study: Algorithm Selection
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2">
                      Scenario
                    </th>
                    <th className="border border-gray-300 px-3 py-2">
                      Best Algorithm
                    </th>
                    <th className="border border-gray-300 px-3 py-2">
                      Is Bubble Sort Suitable?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Large database of customer records
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Merge Sort / Quick Sort
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-red-600">
                      No - too slow
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      Nearly sorted array with few elements out of place
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Insertion Sort
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-yellow-600">
                      Maybe - if small size
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Real-time stream processing
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Heap Sort / Insertion Sort
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-red-600">
                      No - not online
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      Educational exercise for beginners
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Bubble Sort
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-green-600">
                      Yes - simple to understand
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Embedded system with limited memory
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Insertion Sort
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-yellow-600">
                      Maybe - if array is small
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="mb-4">
              Bubble Sort is one of the simplest sorting algorithms but also one
              of the least efficient for large datasets. Its quadratic time
              complexity makes it impractical for most real-world applications
              where data sizes exceed a few dozen elements.
            </p>
            <p className="mb-4">
              However, Bubble Sort does have some redeeming qualities: it's
              simple to implement and understand, it's stable, and it can be
              optimized to perform well on nearly-sorted data. This makes it
              valuable as an educational tool and occasionally useful in
              specific scenarios with very small or nearly-sorted datasets.
            </p>
            <p>
              For most practical applications, algorithms like Quick Sort, Merge
              Sort, or even Insertion Sort would be better choices than Bubble
              Sort due to their superior time complexity and practical
              performance.
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
