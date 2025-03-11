import { Highlight } from "prism-react-renderer";

function StabilityContent({ isDarkMode = false }) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-green-900 via-emerald-950 to-teal-900"
            : "bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600"
        } p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 18h13l-.41-.41-.42-.42H4v.83zm0-3h10l-.41-.41-.42-.42H4v.83zm0-3h7l-.41-.41-.42-.42H4v.83zm15 9H2V5h17a1 1 0 011 1v15a1 1 0 01-1 1z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-4">
            Stability of Bubble Sort
          </h2>
          <p className="max-w-3xl text-lg">
            Understanding how Bubble Sort preserves the relative order of equal
            elements
          </p>
        </div>
      </div>

      {/* What is Stability Card */}
      <div
        className={`rounded-xl shadow-md p-6 border transition-all hover:shadow-lg ${
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-bold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            What is Algorithm Stability?
          </h3>
        </div>

        <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
          <p className="mb-4">
            A sorting algorithm is called{" "}
            <span className="font-semibold">stable</span> if it preserves the
            relative order of equal elements in the sorted output as they
            appeared in the original input array.
          </p>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
            } border ${isDarkMode ? "border-blue-900" : "border-blue-100"}`}
          >
            <p className="font-medium">
              In simpler terms: If two elements have equal sorting keys, their
              order in the sorted output should be the same as their order in
              the original array.
            </p>
          </div>
        </div>
      </div>

      {/* Is Bubble Sort Stable Card */}
      <div
        className={`rounded-xl shadow-md p-6 border transition-all hover:shadow-lg ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-green-900/40" : "bg-green-100"
            }`}
          >
            <svg
              className={`w-6 h-6 ${
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-bold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Is Bubble Sort Stable?
          </h3>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className={`px-6 py-4 rounded-lg ${
              isDarkMode
                ? "bg-green-900/30 border border-green-800"
                : "bg-green-100 border border-green-300"
            } text-center`}
          >
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-green-400" : "text-green-800"
              }`}
            >
              YES
            </p>
            <p className={isDarkMode ? "text-green-200" : "text-green-700"}>
              Bubble Sort is a stable sorting algorithm
            </p>
          </div>
        </div>

        <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
          Bubble Sort compares adjacent elements and swaps them only when the
          left element is greater than the right element. This means equal
          elements are never swapped, maintaining their original relative order.
        </p>
      </div>

      {/* Visual Demonstration Card */}
      <div
        className={`rounded-xl shadow-md p-6 border transition-all hover:shadow-lg ${
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
            className={`text-xl font-bold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Visual Demonstration of Stability
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Original Array */}
          <div>
            <h3
              className={`text-lg font-medium mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Original Array:
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { key: 3, id: "a" },
                { key: 1, id: "b" },
                { key: 2, id: "c" },
                { key: 3, id: "d" },
                { key: 2, id: "e" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded text-center ${
                    isDarkMode
                      ? "bg-blue-900/30 border border-blue-800"
                      : "bg-blue-100 border border-blue-300"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      isDarkMode ? "text-blue-200" : "text-blue-800"
                    }`}
                  >
                    {item.key}
                  </span>
                  <sub
                    className={isDarkMode ? "text-blue-300" : "text-blue-700"}
                  >
                    {item.id}
                  </sub>
                </div>
              ))}
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Each element has a key (the number) and a value (the subscript
              letter). We are sorting based on the key.
            </p>
          </div>

          {/* Sorted Array */}
          <div>
            <h3
              className={`text-lg font-medium mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Sorted Array:
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { key: 1, id: "b" },
                { key: 2, id: "c" },
                { key: 2, id: "e" },
                { key: 3, id: "a" },
                { key: 3, id: "d" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded text-center ${
                    isDarkMode
                      ? "bg-green-900/30 border border-green-800"
                      : "bg-green-100 border border-green-300"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      isDarkMode ? "text-green-200" : "text-green-800"
                    }`}
                  >
                    {item.key}
                  </span>
                  <sub
                    className={isDarkMode ? "text-green-300" : "text-green-700"}
                  >
                    {item.id}
                  </sub>
                </div>
              ))}
            </div>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Notice that the order of equal keys is preserved:
              <ul className="list-disc ml-5 mt-1">
                <li>
                  <span className="font-medium">
                    2<sub>c</sub>
                  </span>{" "}
                  comes before{" "}
                  <span className="font-medium">
                    2<sub>e</sub>
                  </span>
                </li>
                <li>
                  <span className="font-medium">
                    3<sub>a</sub>
                  </span>{" "}
                  comes before{" "}
                  <span className="font-medium">
                    3<sub>d</sub>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-amber-900/20" : "bg-amber-50"
          } border ${isDarkMode ? "border-amber-800" : "border-amber-100"}`}
        >
          <h3
            className={`text-lg font-medium mb-2 ${
              isDarkMode ? "text-amber-200" : "text-amber-800"
            }`}
          >
            How Bubble Sort Maintains Stability
          </h3>
          <p
            className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            During the bubble sort process, adjacent elements are compared and
            swapped only if they are out of order:
          </p>
          <Highlight
            code={`if (arr[j] &gt; arr[j+1]) {
    // Only swap if left element is greater
    swap(arr[j], arr[j+1]);
}`}
            language="javascript"
            theme={isDarkMode ? undefined : undefined} // You can specify themes here
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`p-4 rounded-b-md overflow-x-auto ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-white text-gray-800"
                }`}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
          <p
            className={`mt-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Since equal elements are never swapped (arr[j] &gt; arr[j+1] is
            false when arr[j] = arr[j+1]), they maintain their original relative
            positions in the final sorted array.
          </p>
        </div>
      </div>

      {/* Stability Relevance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Why Stability Matters */}
        <div
          className={`rounded-xl shadow-md p-6 border transition-all hover:shadow-lg ${
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className={`text-lg font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Why Stability Matters
            </h3>
          </div>

          <p
            className={`mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Stability is important in many real-world applications where data
            has multiple attributes:
          </p>
          <ul
            className={`space-y-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {[
              {
                title: "Multi-level sorting:",
                desc: "When sorting data by multiple criteria (e.g., sort employees by department, then by salary)",
              },
              {
                title: "Database operations:",
                desc: "Maintaining consistency in query results when items have equal keys",
              },
              {
                title: "User interfaces:",
                desc: "Keeping related items grouped together even after sorting",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                    isDarkMode ? "bg-blue-400" : "bg-blue-500"
                  }`}
                ></span>
                <span>
                  <strong>{item.title}</strong> {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stability Comparison Table */}
        <div
          className={`rounded-xl shadow-md p-6 border transition-all hover:shadow-lg ${
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <h3
              className={`text-lg font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Stability Across Algorithms
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table
              className={`min-w-full ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <thead
                className={
                  isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100"
                }
              >
                <tr>
                  <th
                    className={`px-3 py-2 text-left font-semibold border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Algorithm
                  </th>
                  <th
                    className={`px-3 py-2 text-center font-semibold border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    Stable?
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Bubble Sort", stable: true },
                  { name: "Insertion Sort", stable: true },
                  { name: "Merge Sort", stable: true },
                  { name: "Selection Sort", stable: false },
                  { name: "Quick Sort", stable: false },
                  { name: "Heap Sort", stable: false },
                ].map((algo, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 1
                        ? isDarkMode
                          ? "bg-gray-900/50"
                          : "bg-gray-50"
                        : ""
                    }
                  >
                    <td
                      className={`px-3 py-2 border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      {algo.name}
                    </td>
                    <td
                      className={`px-3 py-2 text-center border ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      } ${
                        algo.stable
                          ? isDarkMode
                            ? "text-green-400"
                            : "text-green-600"
                          : isDarkMode
                          ? "text-red-400"
                          : "text-red-600"
                      }`}
                    >
                      {algo.stable ? "✓ Yes" : "✗ No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StabilityContent;
