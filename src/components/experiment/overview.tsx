import React from "react";

interface OverviewContentProps {
  isDarkMode?: boolean;
}

const OverviewContent: React.FC<OverviewContentProps> = ({
  isDarkMode = false,
}) => {
  return (
    <div className="space-y-8">

      {/* Prerequisites Card */}
      <div
        className={`rounded-xl border overflow-hidden shadow-sm ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`p-5 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-blue-900/40" : "bg-blue-50"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className={`font-semibold text-xl ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Prerequisites of the Experiment
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            This experiment requires you to have basic knowledge about:
          </p>

          <ul className="space-y-4">
            {[
              {
                text: "The Notion of Sorting",
                url: "https://en.wikipedia.org/wiki/Sorting_algorithm",
              },
              {
                text: "Notion of Time and Space complexity",
                url: "https://en.wikipedia.org/wiki/Time_complexity",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start group">
                <span
                  className={`flex items-center justify-center rounded-full p-1 mr-3 mt-0.5 ${
                    isDarkMode
                      ? "bg-blue-900/30 text-blue-300"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
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
                </span>
                <div>
                  <a
                    href={item.url}
                    className={`${
                      isDarkMode
                        ? "text-blue-300 hover:text-blue-200"
                        : "text-blue-600 hover:text-blue-800"
                    } font-medium underline`}
                  >
                    {item.text}
                  </a>
                </div>
              </li>
            ))}

            <li className="flex items-start mt-4">
              <span
                className={`flex items-center justify-center rounded-full p-1 mr-3 mt-0.5 ${
                  isDarkMode
                    ? "bg-green-900/30 text-green-300"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </span>
              <div
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } italic`}
              >
                And above all, a curiosity to learn and explore!
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Overview Card */}
      <div
        className={`rounded-xl border overflow-hidden shadow-sm ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`p-5 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
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
              className={`font-semibold text-xl ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Overview of the Experiment
            </h3>
          </div>
        </div>

        <div className="p-6">
          <ul className="space-y-4">
            {[
              "The aim of this experiment is to understand the Bubble Sort algorithm, its time and space complexity, and how it compares against other sorting algorithms.",
              "The experiment features a series of modules with video lectures, interactive demonstrations, simulations, hands-on practice exercises and quizzes for self analysis.",
            ].map((point, i) => (
              <li key={i} className="flex items-start">
                <span
                  className={`inline-flex items-center justify-center rounded-full min-w-[28px] h-7 text-sm mr-3 ${
                    isDarkMode
                      ? "bg-purple-900/30 text-purple-300"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modules and Weightage Table */}
      <div
        className={`rounded-xl border overflow-hidden shadow-sm ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`p-5 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-indigo-900/40" : "bg-indigo-50"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  isDarkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3
              className={`font-semibold text-xl ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Experiment Modules and their Weightage
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`overflow-hidden rounded-lg border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`text-left ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <th className="px-6 py-4 font-medium">Module</th>
                    <th className="px-6 py-4 font-medium">Weightage</th>
                    <th className="px-6 py-4 font-medium">Expectation</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDarkMode ? "divide-gray-700" : "divide-gray-200"
                  }`}
                >
                  {[
                    {
                      module: "Pre-Test",
                      weight: "10%",
                      expectation: "Solve All Questions",
                    },
                    {
                      module: "Bubble Sort",
                      weight: "25%",
                      expectation: "Understand the Bubble Sort algorithm",
                    },
                    {
                      module: "Optimized Bubble Sort",
                      weight: "25%",
                      expectation: "Understand the optimization technique",
                    },
                    {
                      module: "Analysis",
                      weight: "25%",
                      expectation: "Understand the time and space complexity",
                    },
                    {
                      module: "Post-test",
                      weight: "15%",
                      expectation: "Solve All Questions",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`${
                        isDarkMode ? "hover:bg-gray-750" : "hover:bg-gray-50"
                      }`}
                    >
                      <td
                        className={`px-6 py-4 ${
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {row.module}
                      </td>
                      <td
                        className={`px-6 py-4 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            isDarkMode
                              ? "bg-indigo-900/40 text-indigo-300"
                              : "bg-indigo-100 text-indigo-800"
                          }`}
                        >
                          {row.weight}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {row.expectation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
