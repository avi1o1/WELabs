import React from "react";

const ComparisonContent = ({ isDarkMode = false }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-indigo-900 via-purple-950 to-blue-900"
            : "bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600"
        } p-6 sm:p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Comparing Bubble Sort with Other Algorithms
          </h2>
          <p className="max-w-3xl text-base sm:text-lg opacity-90">
            While simple to understand, it's important to compare Bubble Sort
            with alternatives to know when it's appropriate and when other
            algorithms would be more efficient.
          </p>
        </div>
      </div>

      {/* Comparison Overview */}
      <div
        className={`rounded-xl shadow-md p-6 border transition-all ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-purple-900/40" : "bg-purple-100"
            }`}
          >
            <svg
              className={`w-6 h-6 ${
                isDarkMode ? "text-purple-400" : "text-purple-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-bold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Algorithm Comparison
          </h3>
        </div>

        <div
          className={`p-4 sm:p-6 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            The following analysis compares Bubble Sort with other common
            sorting algorithms across multiple parameters including time
            complexity, space complexity, and use cases.
          </p>

          {/* Time Complexity Table */}
          <div className="overflow-x-auto mb-6">
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Time Complexity Comparison
            </h4>
            <table
              className={`min-w-full border-collapse ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <thead>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                  <th
                    className={`px-3 py-2 text-left border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Algorithm
                  </th>
                  <th
                    className={`px-3 py-2 text-left border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Best Case
                  </th>
                  <th
                    className={`px-3 py-2 text-left border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Average Case
                  </th>
                  <th
                    className={`px-3 py-2 text-left border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Worst Case
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Bubble Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "bg-green-900/20" : "bg-green-50"}`}
                  >
                    O(n)
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {" (optimized)"}
                    </span>
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Selection Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Insertion Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Merge Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Quick Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-red-900/20"
                        : "border-gray-300 bg-red-50"
                    }`}
                  >
                    O(n²)
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Heap Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 bg-green-900/20"
                        : "border-gray-300 bg-green-50"
                    }`}
                  >
                    O(n log n)
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              className={`flex flex-wrap gap-4 mt-2 text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 mr-1 ${
                    isDarkMode ? "bg-red-900/30" : "bg-red-50"
                  } border ${isDarkMode ? "border-red-800" : "border-red-200"}`}
                ></span>
                <span>Higher complexity (slower)</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 mr-1 ${
                    isDarkMode ? "bg-green-900/30" : "bg-green-50"
                  } border ${
                    isDarkMode ? "border-green-800" : "border-green-200"
                  }`}
                ></span>
                <span>Lower complexity (faster)</span>
              </div>
            </div>
          </div>

          {/* Space & Properties Table */}
          <div className="overflow-x-auto mb-6">
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Space Complexity and Properties
            </h4>
            <table
              className={`min-w-full border-collapse ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <thead>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                  <th
                    className={`px-3 py-2 text-left border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Algorithm
                  </th>
                  <th
                    className={`px-3 py-2 text-left border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Space
                  </th>
                  <th
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Stable
                  </th>
                  <th
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    In-Place
                  </th>
                  <th
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Adaptive
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Bubble Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    O(1)
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Selection Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    O(1)
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                  >
                    ✗
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                  >
                    ✗
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Insertion Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    O(1)
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Merge Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    O(n)
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                  >
                    ✗
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                  >
                    ✗
                  </td>
                </tr>
                <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                  <td
                    className={`px-3 py-2 font-medium border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Quick Sort
                  </td>
                  <td
                    className={`px-3 py-2 border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    O(log n)
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                  >
                    ✗
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    ✓
                  </td>
                  <td
                    className={`px-3 py-2 text-center border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                  >
                    ✗
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <p>
                  <strong>In-Place:</strong> Sorts array without requiring
                  significant extra space
                </p>
                <p>
                  <strong>Stable:</strong> Preserves relative order of equal
                  elements
                </p>
              </div>
              <div
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <p>
                  <strong>Adaptive:</strong> Takes advantage of existing order
                  in its input
                </p>
                <p>
                  <strong>O(1) Space:</strong> Uses constant amount of extra
                  memory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* When to Use Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Card */}
        <div
          className={`rounded-xl shadow-md p-6 border transition-all ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center mb-4">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-blue-900/40" : "bg-blue-100"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Performance Analysis
            </h3>
          </div>

          <div
            className={`p-4 rounded-lg mb-4 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Execution Times (ms) by Array Size
            </h4>

            <div className="overflow-x-auto">
              <table
                className={`min-w-full border-collapse ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th
                      className={`px-3 py-2 text-left border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Algorithm
                    </th>
                    <th
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      1,000 items
                    </th>
                    <th
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      10,000 items
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                    <td
                      className={`px-3 py-2 font-medium border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Bubble Sort
                    </td>
                    <td
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      25ms
                    </td>
                    <td
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      2,500ms
                    </td>
                  </tr>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <td
                      className={`px-3 py-2 font-medium border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Quick Sort
                    </td>
                    <td
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      0.5ms
                    </td>
                    <td
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      6ms
                    </td>
                  </tr>
                  <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                    <td
                      className={`px-3 py-2 font-medium border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Merge Sort
                    </td>
                    <td
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      1ms
                    </td>
                    <td
                      className={`px-3 py-2 text-right border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      12ms
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p
              className={`text-xs mt-3 italic ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Times measured on random integer arrays
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Selection Guide
            </h4>

            <div className="overflow-x-auto">
              <table
                className={`min-w-full border-collapse ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th
                      className={`px-3 py-2 text-left border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Scenario
                    </th>
                    <th
                      className={`px-3 py-2 text-left border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Bubble Sort Suitable?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Large datasets
                    </td>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      } ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                    >
                      No - too slow
                    </td>
                  </tr>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Nearly sorted arrays
                    </td>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      } ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}
                    >
                      Maybe - if small
                    </td>
                  </tr>
                  <tr className={isDarkMode ? "bg-gray-900" : "bg-white"}>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Teaching concepts
                    </td>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      } ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                    >
                      Yes - easy to understand
                    </td>
                  </tr>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      Memory-constrained systems
                    </td>
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      } ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}
                    >
                      Maybe - if array is tiny
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* When to Use Card */}
        <div
          className={`rounded-xl shadow-md p-6 border transition-all ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center mb-4">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-amber-900/40" : "bg-amber-100"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  isDarkMode ? "text-amber-400" : "text-amber-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              When to Use Bubble Sort
            </h3>
          </div>

          <div className="space-y-6">
            {/* Advantages */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-green-900/20" : "bg-green-50"
              } border ${isDarkMode ? "border-green-900" : "border-green-100"}`}
            >
              <h4
                className={`font-semibold mb-3 ${
                  isDarkMode ? "text-green-300" : "text-green-700"
                }`}
              >
                Advantages
              </h4>
              <ul className="space-y-2">
                {[
                  "Simple implementation with minimal code",
                  "Works well for small datasets (less than ~50 elements)",
                  "Stable sorting algorithm (preserves order of equal elements)",
                  "In-place algorithm (requires O(1) extra space)",
                  "Optimized version detects if array is already sorted",
                  "Good for teaching sorting concepts",
                ].map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                        isDarkMode ? "bg-green-400" : "bg-green-500"
                      }`}
                    ></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-red-900/20" : "bg-red-50"
              } border ${isDarkMode ? "border-red-900" : "border-red-100"}`}
            >
              <h4
                className={`font-semibold mb-3 ${
                  isDarkMode ? "text-red-300" : "text-red-700"
                }`}
              >
                Disadvantages
              </h4>
              <ul className="space-y-2">
                {[
                  "Inefficient for large datasets (O(n²) time complexity)",
                  "Significantly slower than alternatives like QuickSort, MergeSort, or HeapSort",
                  "Performs many unnecessary swaps, even in optimized versions",
                  "Performance degrades quadratically as the input size increases",
                  "Elements move only one position at a time (unlike insertion sort)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                        isDarkMode ? "bg-red-400" : "bg-red-500"
                      }`}
                    ></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Use Cases */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <h4
                className={`font-semibold mb-3 ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Best Use Cases
              </h4>
              <div className="flex flex-col space-y-1">
                {[
                  "Educational environments to teach sorting fundamentals",
                  "Very small arrays (less than 10-20 elements)",
                  "Nearly sorted arrays where few elements are out of place",
                  "When code simplicity is more important than performance",
                  "Memory-constrained environments where O(1) space is required",
                  "As a component in more complex algorithms in specific cases",
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center py-1 px-2 rounded ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                        isDarkMode
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        className={`rounded-xl shadow-md p-6 border transition-all ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-indigo-900/40" : "bg-indigo-100"
            }`}
          >
            <svg
              className={`w-6 h-6 ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-bold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Conclusion
          </h3>
        </div>

        <div
          className={`p-5 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Bubble Sort is one of the simplest sorting algorithms but also one
            of the least efficient for large datasets. Its O(n²) time complexity
            makes it impractical for most real-world applications where data
            sizes exceed a few dozen elements.
          </p>

          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            However, it does have some redeeming qualities: it's simple to
            implement and understand, it's stable, and it uses minimal extra
            space. This makes it valuable as an educational tool and
            occasionally useful in specific scenarios with very small datasets.
          </p>

          <div
            className={`flex items-center p-4 rounded-lg ${
              isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
            } border ${
              isDarkMode ? "border-blue-900" : "border-blue-100"
            } mt-4`}
          >
            <svg
              className={`w-12 h-12 mr-4 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <div>
              <h4
                className={`font-semibold mb-1 ${
                  isDarkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                Key Takeaway
              </h4>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                For most practical applications, algorithms like Quick Sort,
                Merge Sort, or Heap Sort would be better choices than Bubble
                Sort due to their superior time complexity, especially as data
                sizes increase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonContent;
