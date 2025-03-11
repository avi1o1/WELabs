import React from "react";

interface ComplexityContentProps {
  isDarkMode?: boolean;
}

const ComplexityContent: React.FC<ComplexityContentProps> = ({
  isDarkMode = false,
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-purple-900 via-indigo-950 to-violet-900"
            : "bg-gradient-to-br from-purple-600 via-indigo-500 to-violet-600"
        } p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-4">
            Complexity Analysis of Bubble Sort
          </h2>
          <p className="max-w-3xl text-lg">
            Understanding the time and space complexity of Bubble Sort algorithm
            across different scenarios.
          </p>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Complexity Card */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center mb-6">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
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
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Time Complexity Analysis
            </h3>
          </div>

          <div className="space-y-4">
            {/* Best Case */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                Best Case: O(n)
              </h4>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Occurs with an already sorted array. Only requires one pass to
                verify the sorting.
              </p>
            </div>

            {/* Average Case */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Average Case: O(n²)
              </h4>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Typical scenario with randomly ordered elements. Requires
                multiple passes through the array.
              </p>
            </div>

            {/* Worst Case */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                Worst Case: O(n²)
              </h4>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Occurs with a reverse-sorted array. Requires maximum number of
                comparisons and swaps.
              </p>
            </div>
          </div>
        </div>

        {/* Space Complexity Card */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center mb-6">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-purple-900/30" : "bg-purple-100"
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
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Space Complexity Analysis
            </h3>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Auxiliary Space: O(1)
            </h4>
            <ul
              className={`space-y-2 text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li>• Only requires a single additional variable for swapping</li>
              <li>• Sorts in-place, modifying the original array</li>
              <li>• No additional data structures needed</li>
              <li>• Memory usage independent of input size</li>
            </ul>
          </div>

          <div
            className={`mt-4 p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Total Space Usage
            </h4>
            <div
              className={`space-y-2 text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p>• Input Space: O(n) for the input array</p>
              <p>• Auxiliary Space: O(1) for temporary variable</p>
              <p className="font-semibold mt-2">
                Total Space Complexity: O(n), dominated by input storage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div
        className={`rounded-xl shadow-md overflow-hidden border ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div
          className={`p-4 border-b ${
            isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Visual Explanation
          </h3>
        </div>
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/4E6CIJgl42I"
            title="Bubble Sort Time and Space Complexity Analysis"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Summary Table */}
      <div
        className={`rounded-xl shadow-md overflow-hidden border ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div
          className={`p-4 border-b ${
            isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Complexity Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table
            className={`min-w-full ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <thead>
              <tr className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode
                      ? "text-gray-300 border-gray-700"
                      : "text-gray-500 border-gray-200"
                  } uppercase tracking-wider border-b`}
                >
                  Metric
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode
                      ? "text-gray-300 border-gray-700"
                      : "text-gray-500 border-gray-200"
                  } uppercase tracking-wider border-b`}
                >
                  Standard
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode
                      ? "text-gray-300 border-gray-700"
                      : "text-gray-500 border-gray-200"
                  } uppercase tracking-wider border-b`}
                >
                  Optimized
                </th>
              </tr>
            </thead>
            <tbody
              className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {[
                ["Best Time", "O(n²)", "O(n)"],
                ["Average Time", "O(n²)", "O(n²)"],
                ["Worst Time", "O(n²)", "O(n²)"],
                ["Space", "O(1)", "O(1)"],
                ["Stable", "Yes", "Yes"],
                ["In-place", "Yes", "Yes"],
              ].map(([metric, standard, optimized], index) => (
                <tr
                  key={metric}
                  className={`${
                    index % 2 === 0
                      ? isDarkMode
                        ? "bg-gray-800"
                        : "bg-white"
                      : isDarkMode
                      ? "bg-gray-900"
                      : "bg-gray-50"
                  }`}
                >
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm border-b ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    {metric}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm border-b ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    {standard}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm border-b ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    {optimized}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplexityContent;
