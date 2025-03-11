import React from "react";

interface FurtherReadingsProps {
  isDarkMode?: boolean;
}

const FurtherReadingsContent: React.FC<FurtherReadingsProps> = ({
  isDarkMode = false,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900"
            : "bg-gradient-to-br from-teal-600 via-emerald-500 to-green-600"
        } p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-10h2v8h-2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold mb-4">Dive Deeper</h2>
        <p className="max-w-3xl text-lg">
          Enhance your understanding of Bubble Sort with these carefully curated
          resources, interactive tools, and additional learning materials.
        </p>
      </div>

      {/* Learning Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Implementations Section */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          } transition-all hover:shadow-lg`}
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-semibold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Code Implementations
            </h3>
          </div>

          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Explore different programming language implementations of the Bubble
            Sort algorithm.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Coding Implementation of Bubble Sort",
                description:
                  "Step-by-step guide with code examples in multiple languages",
                link: "/bubble-sort-implementation",
                icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5",
              },
              {
                title: "Optimized Bubble Sort Variations",
                description:
                  "Learn about optimization techniques for better performance",
                link: "/optimized-bubble-sort",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "Language-Specific Implementations",
                description:
                  "Bubble Sort in JavaScript, Python, Java, C++, and more",
                link: "/language-implementations",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`flex items-start p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700/50 text-gray-200"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                <div
                  className={`p-2 rounded-md mr-3 shrink-0 ${
                    isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
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
                      d={item.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Visualizations Section */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          } transition-all hover:shadow-lg`}
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-semibold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Interactive Tools
            </h3>
          </div>

          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Visualize the Bubble Sort algorithm in action with these interactive
            tools.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Bubble Sort Visualization",
                description:
                  "Interactive tool to visualize how Bubble Sort works",
                link: "/bubble-sort-visualization",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Sorting Algorithms Comparison",
                description:
                  "Compare Bubble Sort with other popular sorting algorithms",
                link: "/sorting-algorithms-comparison",
                icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
              },
              {
                title: "Algorithm Analysis Tool",
                description:
                  "Analyze Bubble Sort performance with different inputs",
                link: "/algorithm-analysis",
                icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`flex items-start p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700/50 text-gray-200"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                <div
                  className={`p-2 rounded-md mr-3 shrink-0 ${
                    isDarkMode ? "bg-purple-900/30" : "bg-purple-50"
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
                      d={item.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* External Resources */}
      <div
        className={`rounded-xl shadow-md p-6 border ${
          isDarkMode
            ? "bg-gray-800/80 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-indigo-900/40" : "bg-indigo-100"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
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
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <h3
            className={`text-lg font-semibold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            External Resources
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            {
              name: "GeeksforGeeks",
              link: "https://www.geeksforgeeks.org/bubble-sort/",
            },
            {
              name: "VisuAlgo",
              link: "https://visualgo.net/en/sorting",
            },
            {
              name: "Khan Academy",
              link: "https://www.khanacademy.org/computing/computer-science/algorithms",
            },
            {
              name: "MIT OpenCourseWare",
              link: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/",
            },
          ].map((resource, idx) => (
            <a
              key={idx}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                isDarkMode
                  ? "bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/30"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              <svg
                className="w-3.5 h-3.5 mr-1"
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
              {resource.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FurtherReadingsContent;
