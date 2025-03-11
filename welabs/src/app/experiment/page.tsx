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

const ExperimentPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("aim");

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
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">
            Complexity Analysis of Bubble Sort
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Video Demonstration of Time and Space Complexity
            </h2>
            <div className="flex justify-center aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-96 rounded-md shadow-sm"
                src="https://www.youtube.com/embed/4E6CIJgl42I"
                title="Bubble Sort Time and Space Complexity Analysis"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Running Time of Bubble Sort
            </h2>
            <p className="mb-4">
              Let's analyze the time complexity of sorting N elements of a given
              array using SIMPLE Bubble Sort:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                To complete one iteration, we traverse the array exactly once.
                Since we perform N-1 comparisons in an iteration, time
                complexity of completing one iteration is O(N).
              </li>
              <li>
                In regular Bubble Sort, we run N-1 iterations, which is O(N), to
                sort our array. Hence overall time complexity becomes O(N*N).
              </li>
              <li>
                Note that even if array is fully sorted initially, regular
                Bubble Sort will take O(N²) time to complete.
              </li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <p className="font-medium">Time Complexity: O(N²)</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Best and Worst Cases for Optimized Bubble Sort
            </h2>
            <p className="mb-4">
              For regular Bubble Sort, time complexity will be O(N²) in all
              cases. For optimized Bubble Sort:
            </p>

            <div className="bg-white p-4 rounded-md mb-4">
              <h3 className="text-lg font-medium mb-2">Best Case: O(N)</h3>
              <p>
                In best case scenario, we will have an already sorted array. We
                will have to run one iteration (N-1 comparisons) to determine
                this. Time complexity will be O(N) in this case.
              </p>
            </div>

            <div className="bg-white p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Worst Case: O(N²)</h3>
              <p>
                In worst case (reverse sorted array) we will have to run N
                iterations to sort our array. Total comparisons performed will
                be (N-1)+(N-2)+(N-3)....+2+1. Hence overall time complexity
                becomes O(N²).
              </p>
            </div>

            <div className="mt-4">
              <p>
                Try out the demo below and look out for the number of
                comparisons performed for sorted, reverse sorted and randomly
                generated array using optimized Bubble Sort. Notice how the
                number of comparisons always remains between O(N) and O(N²)!
              </p>
            </div>
          </div>

          <div className="simulation-container border border-gray-200 rounded-lg shadow-sm mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Time Complexity Visualization
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Start
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300">
                  Reset
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6 flex justify-center space-x-6">
                <div className="text-center">
                  <button className="mb-2 px-4 py-2 bg-green-100 hover:bg-green-200 border border-green-300 rounded">
                    Sorted Array
                  </button>
                  <div className="text-sm">Best Case: O(n)</div>
                </div>
                <div className="text-center">
                  <button className="mb-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded">
                    Random Array
                  </button>
                  <div className="text-sm">Average Case: O(n²)</div>
                </div>
                <div className="text-center">
                  <button className="mb-2 px-4 py-2 bg-red-100 hover:bg-red-200 border border-red-300 rounded">
                    Reverse Array
                  </button>
                  <div className="text-sm">Worst Case: O(n²)</div>
                </div>
              </div>

              <div className="h-64 border border-gray-200 rounded bg-gray-50 relative mb-6 p-4">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
                  Visualization Area
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <h3 className="text-md font-medium mb-2">Statistics</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Array Size:</div>
                    <div className="font-semibold">10</div>
                    <div>Comparisons:</div>
                    <div className="font-semibold">45</div>
                    <div>Swaps:</div>
                    <div className="font-semibold">21</div>
                    <div>Iterations:</div>
                    <div className="font-semibold">9</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <h3 className="text-md font-medium mb-2">Runtime Analysis</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Current Array:</div>
                    <div className="font-semibold">Random</div>
                    <div>Expected Time:</div>
                    <div className="font-semibold">O(n²)</div>
                    <div>Measured Time:</div>
                    <div className="font-semibold">O(n²)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h2 className="text-xl font-semibold mb-4">
              Space Complexity of Bubble Sort
            </h2>
            <p className="mb-4">
              While swapping two elements, we need some extra space to store
              temporary values. Other than that, the sorting can be done
              in-place. Hence space complexity is O(1) or constant space.
            </p>

            <div className="bg-white p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Memory Usage:</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Input: O(n) for storing the array</li>
                <li>Auxiliary: O(1) for temporary variables during swapping</li>
                <li>Total: O(n) dominated by the input storage</li>
              </ul>
              <p className="mt-4">
                This makes Bubble Sort a memory-efficient algorithm as it
                doesn't require additional space proportional to the input size.
              </p>
            </div>
          </div>

          <div className="mt-8 mb-4">
            <h2 className="text-2xl font-semibold mb-4">
              Summary of Bubble Sort Complexity
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Aspect</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Standard Bubble Sort
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Optimized Bubble Sort
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Best Time
                    </td>
                    <td className="border border-gray-300 px-4 py-2">O(n²)</td>
                    <td className="border border-gray-300 px-4 py-2">O(n)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Average Time
                    </td>
                    <td className="border border-gray-300 px-4 py-2">O(n²)</td>
                    <td className="border border-gray-300 px-4 py-2">O(n²)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Worst Time
                    </td>
                    <td className="border border-gray-300 px-4 py-2">O(n²)</td>
                    <td className="border border-gray-300 px-4 py-2">O(n²)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Space Complexity
                    </td>
                    <td className="border border-gray-300 px-4 py-2">O(1)</td>
                    <td className="border border-gray-300 px-4 py-2">O(1)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Stability
                    </td>
                    <td className="border border-gray-300 px-4 py-2">Stable</td>
                    <td className="border border-gray-300 px-4 py-2">Stable</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      In-place
                    </td>
                    <td className="border border-gray-300 px-4 py-2">Yes</td>
                    <td className="border border-gray-300 px-4 py-2">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
        stability: {
      title: "Stability of Bubble Sort",
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">Stability of Bubble Sort</h1>
    
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is Algorithm Stability?</h2>
            <p className="mb-4">
              A sorting algorithm is called <span className="font-semibold">stable</span> if it preserves the relative order of equal elements in the sorted output as they appeared in the original input array.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="font-medium">
                In simpler terms: If two elements have equal sorting keys, their order in the sorted output should be the same as their order in the original array.
              </p>
            </div>
          </div>
    
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Is Bubble Sort Stable?</h2>
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 px-6 py-4 rounded-lg border border-green-300 text-center">
                <p className="text-2xl font-bold text-green-800">YES</p>
                <p>Bubble Sort is a stable sorting algorithm</p>
              </div>
            </div>
            <p>
              Bubble Sort compares adjacent elements and swaps them only when the left element is greater than the right element. This means equal elements are never swapped, maintaining their original relative order.
            </p>
          </div>
    
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Visual Demonstration of Stability</h2>
            
            <div className="flex flex-col md:flex-row md:space-x-8 mb-6">
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-medium mb-2">Original Array:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-4 py-2 bg-blue-100 rounded border border-blue-300 text-center">
                    <span className="font-bold">3</span><sub>a</sub>
                  </div>
                  <div className="px-4 py-2 bg-blue-100 rounded border border-blue-300 text-center">
                    <span className="font-bold">1</span><sub>b</sub>
                  </div>
                  <div className="px-4 py-2 bg-blue-100 rounded border border-blue-300 text-center">
                    <span className="font-bold">2</span><sub>c</sub>
                  </div>
                  <div className="px-4 py-2 bg-blue-100 rounded border border-blue-300 text-center">
                    <span className="font-bold">3</span><sub>d</sub>
                  </div>
                  <div className="px-4 py-2 bg-blue-100 rounded border border-blue-300 text-center">
                    <span className="font-bold">2</span><sub>e</sub>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Each element has a key (the number) and a value (the subscript letter).
                  We are sorting based on the key.
                </p>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Sorted Array:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-4 py-2 bg-green-100 rounded border border-green-300 text-center">
                    <span className="font-bold">1</span><sub>b</sub>
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded border border-green-300 text-center">
                    <span className="font-bold">2</span><sub>c</sub>
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded border border-green-300 text-center">
                    <span className="font-bold">2</span><sub>e</sub>
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded border border-green-300 text-center">
                    <span className="font-bold">3</span><sub>a</sub>
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded border border-green-300 text-center">
                    <span className="font-bold">3</span><sub>d</sub>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Notice that the order of equal keys is preserved:
                  <ul className="list-disc ml-5 mt-1">
                    <li><span className="font-bold">2<sub>c</sub></span> comes before <span className="font-bold">2<sub>e</sub></span></li>
                    <li><span className="font-bold">3<sub>a</sub></span> comes before <span className="font-bold">3<sub>d</sub></span></li>
                  </ul>
                </div>
              </div>
            </div>
    
            <div className="bg-amber-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">How Bubble Sort Maintains Stability</h3>
              <p className="mb-2">
                During the bubble sort process, adjacent elements are compared and swapped only if they are out of order:
              </p>
              <pre className="bg-gray-100 p-3 rounded">
                <code>if (arr[j] > arr[j+1]) {'{'} // Only swap if left element is greater
      swap(arr[j], arr[j+1]);
    {'}'}</code>
              </pre>
              <p className="mt-3">
                Since equal elements are never swapped (arr[j] > arr[j+1] is false when arr[j] = arr[j+1]), 
                they maintain their original relative positions in the final sorted array.
              </p>
            </div>
          </div>
    
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-medium mb-3">Why Stability Matters</h3>
              <p className="mb-3">
                Stability is important in many real-world applications where data has multiple attributes:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Multi-level sorting:</strong> When sorting data by multiple criteria (e.g., sort employees by department, then by salary)
                </li>
                <li>
                  <strong>Database operations:</strong> Maintaining consistency in query results when items have equal keys
                </li>
                <li>
                  <strong>User interfaces:</strong> Keeping related items grouped together even after sorting
                </li>
              </ul>
            </div>
    
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-3">Stability in Other Sorting Algorithms</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2">Algorithm</th>
                      <th className="border border-gray-300 px-3 py-2">Stable?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Bubble Sort</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-600">✓ Yes</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Insertion Sort</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-600">✓ Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Merge Sort</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-600">✓ Yes</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Selection Sort</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">✗ No</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Quick Sort</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">✗ No</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Heap Sort</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">✗ No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ),
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
              While Bubble Sort is simple to understand and implement, it's important to compare it with other sorting algorithms to understand when it might be appropriate to use and when other algorithms would be more efficient.
            </p>
            <p>
              The following comparisons analyze bubble sort against other common sorting algorithms across multiple parameters including time complexity, space complexity, stability, and practical use cases.
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
              Notice how Bubble Sort (red line) performs worse than other algorithms as the input size increases.
            </p>
          </div>
    
          <div className="overflow-x-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Time Complexity Comparison
            </h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3">Algorithm</th>
                  <th className="border border-gray-300 px-4 py-3">Best Case</th>
                  <th className="border border-gray-300 px-4 py-3">Average Case</th>
                  <th className="border border-gray-300 px-4 py-3">Worst Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Bubble Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(n) <span className="text-gray-500 text-sm">(optimized)</span></td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Selection Sort</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Insertion Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Merge Sort</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Quick Sort</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-red-50">O(n²)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Heap Sort</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(n log n)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Radix Sort</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(nk)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(nk)</td>
                  <td className="border border-gray-300 px-4 py-3 bg-green-50">O(nk)</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm mt-2 text-gray-600">
              <span className="inline-block w-3 h-3 bg-red-50 mr-1 border border-gray-300"></span> Higher complexity (slower) 
              <span className="inline-block w-3 h-3 bg-green-50 ml-4 mr-1 border border-gray-300"></span> Lower complexity (faster)
              <br />
              <span className="italic">n = input size, k = number of digits in largest number (for Radix Sort)</span>
            </p>
          </div>
    
          <div className="overflow-x-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Space Complexity and Other Properties
            </h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3">Algorithm</th>
                  <th className="border border-gray-300 px-4 py-3">Space Complexity</th>
                  <th className="border border-gray-300 px-4 py-3">Stability</th>
                  <th className="border border-gray-300 px-4 py-3">In-Place</th>
                  <th className="border border-gray-300 px-4 py-3">Adaptive</th>
                  <th className="border border-gray-300 px-4 py-3">Online</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Bubble Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Selection Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Insertion Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Merge Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(n)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Quick Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(log n)</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Heap Sort</td>
                  <td className="border border-gray-300 px-4 py-3">O(1)</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">No</td>
                </tr>
              </tbody>
            </table>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="text-sm text-gray-700">
                <p><strong>In-Place:</strong> Algorithm sorts the array without requiring significant extra space</p>
                <p><strong>Stable:</strong> Preserves relative order of equal elements</p>
              </div>
              <div className="text-sm text-gray-700">
                <p><strong>Adaptive:</strong> Takes advantage of existing order in its input</p>
                <p><strong>Online:</strong> Can process its input piece-by-piece without having the entire input available from the start</p>
              </div>
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Practical Performance</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Average execution times (ms)</h3>
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
                      <th className="border border-gray-300 px-3 py-2">Algorithm</th>
                      <th className="border border-gray-300 px-3 py-2">1K elements</th>
                      <th className="border border-gray-300 px-3 py-2">10K elements</th>
                      <th className="border border-gray-300 px-3 py-2">100K elements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Bubble Sort</td>
                      <td className="border border-gray-300 px-3 py-2">25ms</td>
                      <td className="border border-gray-300 px-3 py-2">2,500ms</td>
                      <td className="border border-gray-300 px-3 py-2">250,000ms</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Quick Sort</td>
                      <td className="border border-gray-300 px-3 py-2">0.5ms</td>
                      <td className="border border-gray-300 px-3 py-2">6ms</td>
                      <td className="border border-gray-300 px-3 py-2">80ms</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Merge Sort</td>
                      <td className="border border-gray-300 px-3 py-2">1ms</td>
                      <td className="border border-gray-300 px-3 py-2">12ms</td>
                      <td className="border border-gray-300 px-3 py-2">150ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h2 className="text-xl font-semibold mb-4">When to Use Bubble Sort</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2 text-green-700">Advantages</h3>
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
                <h3 className="text-lg font-medium mb-2 text-red-700">Disadvantages</h3>
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
            <h2 className="text-xl font-semibold mb-4">Case Study: Algorithm Selection</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2">Scenario</th>
                    <th className="border border-gray-300 px-3 py-2">Best Algorithm</th>
                    <th className="border border-gray-300 px-3 py-2">Is Bubble Sort Suitable?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Large database of customer records</td>
                    <td className="border border-gray-300 px-3 py-2">Merge Sort / Quick Sort</td>
                    <td className="border border-gray-300 px-3 py-2 text-red-600">No - too slow</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">Nearly sorted array with few elements out of place</td>
                    <td className="border border-gray-300 px-3 py-2">Insertion Sort</td>
                    <td className="border border-gray-300 px-3 py-2 text-yellow-600">Maybe - if small size</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Real-time stream processing</td>
                    <td className="border border-gray-300 px-3 py-2">Heap Sort / Insertion Sort</td>
                    <td className="border border-gray-300 px-3 py-2 text-red-600">No - not online</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">Educational exercise for beginners</td>
                    <td className="border border-gray-300 px-3 py-2">Bubble Sort</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-600">Yes - simple to understand</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Embedded system with limited memory</td>
                    <td className="border border-gray-300 px-3 py-2">Insertion Sort</td>
                    <td className="border border-gray-300 px-3 py-2 text-yellow-600">Maybe - if array is small</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="mb-4">
              Bubble Sort is one of the simplest sorting algorithms but also one of the least efficient for large datasets. Its quadratic time complexity makes it impractical for most real-world applications where data sizes exceed a few dozen elements.
            </p>
            <p className="mb-4">
              However, Bubble Sort does have some redeeming qualities: it's simple to implement and understand, it's stable, and it can be optimized to perform well on nearly-sorted data. This makes it valuable as an educational tool and occasionally useful in specific scenarios with very small or nearly-sorted datasets.
            </p>
            <p>
              For most practical applications, algorithms like Quick Sort, Merge Sort, or even Insertion Sort would be better choices than Bubble Sort due to their superior time complexity and practical performance.
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
