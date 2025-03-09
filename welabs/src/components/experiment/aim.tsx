import React from "react";

interface AimContentProps {
  isDarkMode?: boolean;
}

const AimContent: React.FC<AimContentProps> = ({ isDarkMode = false }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div
        className={`rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-900"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }`}
      >
        <div className="relative p-6 md:p-8">
          <div className="max-w-3xl">
            <h2
              className={`text-3xl font-bold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Bubble Sort Algorithm
            </h2>

            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode
                  ? "bg-blue-900/50 text-blue-200"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              <svg
                className="w-4 h-4 mr-1"
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
              Estimated time: 1 hour
            </div>

            <p
              className={`text-lg ${
                isDarkMode ? "text-blue-100" : "text-blue-800"
              }`}
            >
              Master one of the fundamental sorting techniques in computer
              science through interactive learning and practical exercises.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Objectives Card */}
      <div
        className={`rounded-xl border overflow-hidden shadow-sm ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`px-6 py-4 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`p-2 rounded-lg mr-3 ${
                isDarkMode ? "bg-purple-900/40" : "bg-purple-50"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Learning Objectives
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            By the end of this experiment, you will be able to:
          </p>

          <ul className="space-y-4">
            {[
              "Generate a sorted array by applying Bubble Sort on an unsorted array of numbers",
              "Optimize the Bubble Sort algorithm for better performance",
              "Demonstrate knowledge of time complexity by counting operations in each iteration",
              "Compare Bubble Sort with other algorithms and understand it as a stable comparison sorting algorithm",
            ].map((objective, i) => (
              <li key={i} className="flex items-start group">
                <div
                  className={`flex items-center justify-center rounded-full min-w-[28px] h-7 text-sm mr-3 mt-0.5 transition-colors ${
                    isDarkMode
                      ? "bg-purple-900/30 text-purple-200 group-hover:bg-purple-900/50"
                      : "bg-purple-100 text-purple-700 group-hover:bg-purple-200"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {objective}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Note Card */}
      <div
        className={`flex p-5 rounded-xl ${
          isDarkMode
            ? "bg-blue-900/20 border border-blue-900/30"
            : "bg-blue-50 border border-blue-100"
        }`}
      >
        <div className="shrink-0">
          <div
            className={`p-2 rounded-full ${
              isDarkMode ? "bg-blue-900/50" : "bg-blue-100"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                isDarkMode ? "text-blue-300" : "text-blue-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="ml-4">
          <h4
            className={`text-lg font-medium mb-1 ${
              isDarkMode ? "text-blue-100" : "text-blue-800"
            }`}
          >
            Note
          </h4>
          <p className={`${isDarkMode ? "text-blue-200" : "text-blue-700"}`}>
            This experiment provides hands-on experience with the Bubble Sort
            algorithm, one of the fundamental sorting techniques in computer
            science.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AimContent;
