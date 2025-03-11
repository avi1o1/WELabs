import React from "react";

interface ReferencesContentProps {
  isDarkMode?: boolean;
}

const ReferencesContent: React.FC<ReferencesContentProps> = ({
  isDarkMode = false,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"
            : "bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600"
        } p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold mb-4">Academic References</h2>
        <p className="max-w-3xl text-lg">
          Key resources and citations for further study on sorting algorithms
          and bubble sort specifically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Textbooks Section */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center mb-5">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-blue-900/40" : "bg-blue-100"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-semibold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Textbooks
            </h3>
          </div>

          <ul className="space-y-5">
            <li
              className={`pb-5 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div
                className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
              >
                <div className="font-medium">
                  Introduction to Algorithms (3rd ed.)
                </div>
                <div className="mt-1">
                  Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C.
                  (2009)
                </div>
                <div className="text-sm mt-1.5 italic">MIT Press</div>
              </div>
              <div
                className={`mt-2 px-3 py-1.5 rounded-md ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  Chapter Reference:
                </span>
                <span
                  className={`ml-1.5 text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Chapter 2.2: Analyzing algorithms, pp. 39-45
                </span>
              </div>
            </li>

            <li>
              <div
                className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
              >
                <div className="font-medium">Algorithms (4th ed.)</div>
                <div className="mt-1">Sedgewick, R., & Wayne, K. (2011)</div>
                <div className="text-sm mt-1.5 italic">
                  Addison-Wesley Professional
                </div>
              </div>
              <div
                className={`mt-2 px-3 py-1.5 rounded-md ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  Chapter Reference:
                </span>
                <span
                  className={`ml-1.5 text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Chapter 2.1: Elementary Sorts, pp. 245-252
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Academic Papers Section */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center mb-5">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-green-900/40" : "bg-green-100"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-semibold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Academic Papers
            </h3>
          </div>

          <ul className="space-y-5">
            <li
              className={`pb-5 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div
                className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
              >
                <div className="font-medium">
                  Bubble sort: An archaeological algorithmic analysis
                </div>
                <div className="mt-1">Astrachan, O. (2003)</div>
                <div className="text-sm mt-1.5 italic">
                  ACM SIGCSE Bulletin, 35(1), 1-5
                </div>
              </div>
              <div
                className={`mt-2 px-3 py-1.5 rounded-md ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-green-300" : "text-green-700"
                  }`}
                >
                  DOI:
                </span>
                <span
                  className={`ml-1.5 text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  10.1145/792548.611918
                </span>
              </div>
            </li>

            <li>
              <div
                className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
              >
                <div className="font-medium">
                  Sorting: A distribution theory
                </div>
                <div className="mt-1">Mahmoud, H. (2000)</div>
                <div className="text-sm mt-1.5 italic">John Wiley & Sons</div>
              </div>
              <div
                className={`mt-2 px-3 py-1.5 rounded-md ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-green-300" : "text-green-700"
                  }`}
                >
                  Focus:
                </span>
                <span
                  className={`ml-1.5 text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Historical analysis of bubble sort implementation
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Online Resources Section */}
      <div
        className={`rounded-xl shadow-md p-6 border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }`}
      >
        <div className="flex items-center mb-5">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-purple-900/40" : "bg-purple-100"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
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
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Online Resources
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "GeeksforGeeks: Bubble Sort",
              url: "https://www.geeksforgeeks.org/bubble-sort/",
              description:
                "Comprehensive tutorial with implementation examples",
            },
            {
              title: "VisuAlgo: Sorting Visualization",
              url: "https://visualgo.net/en/sorting",
              description:
                "Interactive visualization of bubble sort and other sorting algorithms",
            },
            {
              title: "Wikipedia: Bubble Sort",
              url: "https://en.wikipedia.org/wiki/Bubble_sort",
              description: "Detailed article on the algorithm with analysis",
            },
          ].map((resource, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 transition-all hover:shadow-md ${
                isDarkMode
                  ? "bg-gray-900/70 hover:bg-gray-900"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block font-medium mb-1.5 ${
                  isDarkMode
                    ? "text-purple-300 hover:text-purple-200"
                    : "text-purple-700 hover:text-purple-800"
                }`}
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {resource.title}
                </div>
              </a>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Citation Format */}
      <div
        className={`rounded-xl shadow-md p-6 border ${
          isDarkMode
            ? "bg-amber-900/30 border-amber-900/50"
            : "bg-amber-50 border-amber-200"
        }`}
      >
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-amber-900/50" : "bg-amber-100"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold ml-3 ${
              isDarkMode ? "text-amber-200" : "text-amber-800"
            }`}
          >
            Citation Format
          </h3>
        </div>

        <p
          className={`mt-3 ${isDarkMode ? "text-amber-100" : "text-amber-900"}`}
        >
          When referencing materials from this experiment in your reports or
          assignments, please use the APA citation style (7th Edition) as
          demonstrated in the references above.
        </p>

        <div
          className={`mt-4 p-4 rounded-md ${
            isDarkMode ? "bg-gray-900/50" : "bg-white"
          }`}
        >
          <code
            className={`block font-mono text-sm ${
              isDarkMode ? "text-amber-300" : "text-amber-700"
            }`}
          >
            Author, A. A. (Year). Title of work. Publisher.
            <br />
            Author, B. B. (Year). Title of article. Journal Title,
            Volume(Issue), pages.
          </code>
        </div>
      </div>
    </div>
  );
};

export default ReferencesContent;
