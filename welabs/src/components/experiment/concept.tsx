import React, { useEffect, useRef, useState } from "react";

interface ConceptContentProps {
  isDarkMode?: boolean;
}

const ConceptContent: React.FC<ConceptContentProps> = ({ isDarkMode = false }) => {
  // Enhanced Bubble Sort Animation component
  function EnhancedBubbleSortAnimation() {
    const [array, setArray] = useState([5, 3, 9, 1, 7, 4]);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [speed, setSpeed] = useState(400); // ms
    const [isSwapping, setIsSwapping] = useState(false);

    // Save the initial array to reset later
    const initialArray = useRef([5, 3, 9, 1, 7, 4]);

    // For random array generation
    const generateRandomArray = () => {
      const min = 1;
      const max = 12;
      const length = 6;
      const newArray = Array.from(
        { length },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
      initialArray.current = [...newArray];
      setArray(newArray);
      resetCounters();
    };

    // Reset just the counters
    const resetCounters = () => {
      setI(0);
      setJ(0);
      setComparisons(0);
      setSwaps(0);
      setIsRunning(true);
      setIsSwapping(false);
    };

    // Bubble Sort step runs on an interval
    useEffect(() => {
      if (!isRunning) return;

      const interval = setInterval(() => {
        // If we're in the middle of showing a swap animation, skip this tick
        if (isSwapping) {
          setIsSwapping(false);
          return;
        }

        setArray((prevArray) => {
          let arr = [...prevArray];

          // If we've completed passes, stop the animation
          if (i >= arr.length - 1) {
            setIsRunning(false);
            return arr;
          }

          // If j is within the pass
          if (j < arr.length - i - 1) {
            // Increment comparison count
            setComparisons((prev) => prev + 1);

            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
              // Increment swap count
              setSwaps((prev) => prev + 1);

              // Set swapping flag to true to show the animation
              setIsSwapping(true);

              // Swap
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            // Move to the next pair
            setJ(j + 1);
          } else {
            // One full pass done, reset j and increment i
            setJ(0);
            setI(i + 1);
          }
          return arr;
        });
      }, speed);

      return () => clearInterval(interval);
    }, [i, j, isRunning, speed, isSwapping]);

    // Reset the animation
    function handleReset() {
      setArray([...initialArray.current]);
      resetCounters();
    }

    // Toggle play/pause
    function togglePlayPause() {
      setIsRunning(!isRunning);
    }

    // Determine if the element is sorted (past the current position)
    function isSorted(index: number) {
      return index >= array.length - i;
    }

    // Calculate progress percentage
    const progressPercentage =
      ((i * array.length + j) / ((array.length * (array.length - 1)) / 2)) *
      100;

    return (
      <div className="space-y-6">
        {/* Information Display */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <span className="font-semibold">Pass:</span> {i + 1}/
              {array.length}
            </div>
            <div className="flex gap-4">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                <span className="font-semibold">Comparisons:</span>{" "}
                {comparisons}
              </span>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-amber-300" : "text-amber-700"
                }`}
              >
                <span className="font-semibold">Swaps:</span> {swaps}
              </span>
            </div>
          </div>

          {/* Fixed layout to prevent progress bar from pushing buttons */}
          <div className="flex sm:flex-1 items-center justify-between gap-4">
            {/* Progress Bar - Now with fixed width container */}
            <div className="w-24 sm:w-32 md:w-40">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 justify-end shrink-0">
              <button
                onClick={togglePlayPause}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {isRunning ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 4H6v16h4V4zm8 0h-4v16h4V4z" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
                Reset
              </button>
              <button
                onClick={generateRandomArray}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isDarkMode
                    ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm-9.09 12.74L12 10.15l2.59 2.59L13.17 14 18 14.01v-4.84l-1.42 1.42L12 6l-7.59 7.59 1 1.15z" />
                </svg>
                Randomize
              </button>
            </div>
          </div>
        </div>

        {/* Speed Control */}
        <div
          className={`flex items-center gap-3 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <span className="text-sm whitespace-nowrap">Speed:</span>
          <input
            type="range"
            min="100"
            max="1000"
            value={1100 - speed} // Inverted so higher = faster
            onChange={(e) => setSpeed(1100 - parseInt(e.target.value))}
            className="w-full max-w-xs h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm whitespace-nowrap">
            {speed < 200 ? "Fast" : speed < 600 ? "Medium" : "Slow"}
          </span>
        </div>

        {/* Array Blocks - Now with values inside instead of indices */}
        <div className="py-6 flex space-x-3 items-end justify-center min-h-[180px]">
          {array.map((num, idx) => {
            // Get the right CSS classes based on the element's state
            const isActive = j === idx || j === idx - 1;
            const isComparing = j === idx || j === idx + 1;
            const isSortedElement = isSorted(idx);

            // Determine the color based on the element's state
            let colorClasses;
            if (isSortedElement) {
              colorClasses = isDarkMode
                ? "bg-gradient-to-br from-green-600 to-emerald-800"
                : "bg-gradient-to-br from-green-500 to-emerald-600";
            } else if (isComparing && isSwapping) {
              colorClasses = "bg-gradient-to-br from-amber-500 to-yellow-600";
            } else if (isComparing) {
              colorClasses = isDarkMode
                ? "bg-gradient-to-br from-blue-600 to-indigo-800"
                : "bg-gradient-to-br from-blue-500 to-indigo-700";
            } else {
              colorClasses = isDarkMode
                ? "bg-gradient-to-br from-gray-600 to-gray-700"
                : "bg-gradient-to-br from-gray-400 to-gray-500";
            }

            return (
              <div
                key={`block-${idx}`}
                className={`flex flex-col items-center ${
                  isActive && isSwapping ? "animate-bounce" : ""
                }`}
              >
                {/* The actual block with height based on value - no label above anymore */}
                <div
                  className={`${colorClasses} relative rounded-md w-12 sm:w-16 flex items-center justify-center shadow-md
                  ${isComparing ? "ring-2 ring-yellow-400 z-10" : ""}
                  ${isActive && "z-20"}`}
                  style={{
                    height: `${num * 10 + 20}px`,
                    transition:
                      "height 0.4s ease-in-out, transform 0.2s ease-in-out",
                    transform:
                      isComparing && isSwapping ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {/* Value now displayed inside the block */}
                  <span className="text-white font-bold text-lg">{num}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation Legend */}
        <div
          className={`flex flex-wrap gap-4 justify-center text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isDarkMode ? "bg-blue-600" : "bg-blue-500"
              }`}
            ></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isDarkMode ? "bg-amber-500" : "bg-amber-500"
              }`}
            ></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isDarkMode ? "bg-green-600" : "bg-green-500"
              }`}
            ></div>
            <span>Sorted</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-indigo-900 via-purple-950 to-blue-900"
            : "bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600"
        } p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold mb-4">Bubble Sort</h2>
        <p className="max-w-3xl text-lg">
          A simple comparison-based sorting algorithm that repeatedly steps
          through the list, compares adjacent elements, and swaps them if
          they're in the wrong order.
        </p>
      </div>

      {/* Key Concepts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What is Sorting Card */}
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
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              What is Sorting?
            </h3>
          </div>
          <p
            className={`leading-relaxed mb-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Given a list of random numbers, <strong>sorting</strong> means
            ordering them in either ascending or descending order. By default,
            we sort numbers in ascending order.
          </p>
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode
                  ? "bg-blue-900/30 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Ascending Order
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode
                  ? "bg-purple-900/30 text-purple-300"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              Descending Order
            </span>
          </div>
        </div>

        {/* How Bubble Sort Works Card */}
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              How Bubble Sort Works
            </h3>
          </div>
          <ol
            className={`space-y-3 mb-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {[
              "Compare each pair of adjacent elements in the list",
              "Swap them if they are in the wrong order",
              'After each pass, the largest element "bubbles up" to its correct position',
              "Repeat until the entire list is sorted",
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span
                  className={`flex items-center justify-center rounded-full h-5 w-5 text-sm mr-2 mt-0.5 ${
                    isDarkMode
                      ? "bg-green-900/30 text-green-300"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Interactive Visualization Section */}
      <div
        className={`rounded-xl shadow-md overflow-hidden border ${
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
          <div className="flex items-center">
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
              Bubble Sort Animation
            </h3>
          </div>
        </div>

        <div className="p-6">
          {/* Enhanced Bubble Sort Animation with Reset & Comparisons */}
          <div
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <EnhancedBubbleSortAnimation />
          </div>
        </div>
      </div>

      {/* Complexity Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Complexity */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center mb-4">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-red-900/30" : "bg-red-100"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Time Complexity
            </h3>
          </div>

          <div className="space-y-4">
            {/* Best Case */}
            <div
              className={`flex items-center p-3 rounded-lg justify-between ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Best Case:
              </span>
              <div className="text-right">
                <code
                  className={`px-3 py-1 rounded-lg font-mono text-sm ${
                    isDarkMode
                      ? "bg-green-900/30 text-green-300"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  O(n)
                </code>
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Already sorted array
                </p>
              </div>
            </div>

            {/* Average Case */}
            <div
              className={`flex items-center p-3 rounded-lg justify-between ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Average Case:
              </span>
              <div className="text-right">
                <code
                  className={`px-3 py-1 rounded-lg font-mono text-sm ${
                    isDarkMode
                      ? "bg-yellow-900/30 text-yellow-300"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  O(n²)
                </code>
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Random array
                </p>
              </div>
            </div>

            {/* Worst Case */}
            <div
              className={`flex items-center p-3 rounded-lg justify-between ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Worst Case:
              </span>
              <div className="text-right">
                <code
                  className={`px-3 py-1 rounded-lg font-mono text-sm ${
                    isDarkMode
                      ? "bg-red-900/30 text-red-300"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  O(n²)
                </code>
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Reverse-sorted array
                </p>
              </div>
            </div>
          </div>

          <p
            className={`text-sm mt-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            The nested loops in bubble sort result in O(n²) time complexity in
            most cases, though an optimized version can achieve O(n) in the best
            case scenario when the array is already sorted.
          </p>
        </div>

        {/* Space Complexity */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center mb-4">
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
                {/* "Cube" icon from Heroicons */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7L12 3 4 7m16 0l-8 4-8-4m16 0v8m-8 4l8-4m-8 4l-8-4m8 4v-8"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Space Complexity
            </h3>
          </div>

          <p
            className={`leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Bubble Sort is an <em>in-place</em> sorting algorithm, which means
            it requires only a constant amount of extra space. Therefore, the{" "}
            <strong>space complexity</strong> is{" "}
            <code
              className={`px-2 py-1 rounded ${
                isDarkMode
                  ? "bg-purple-900/30 text-purple-300"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              O(1)
            </code>
            .
          </p>

          <div
            className={`mt-6 p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              What makes Bubble Sort in-place?
            </h4>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Bubble Sort only requires a constant amount of extra memory space
              regardless of input size because:
            </p>
            <ul
              className={`list-disc pl-5 mt-2 space-y-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>It swaps elements directly within the original array</li>
              <li>
                It only needs to track a few variables (indices and swap flag)
                regardless of array size
              </li>
              <li>No additional data structures are required</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advantages and Disadvantages */}
      <div
        className={`rounded-xl shadow-md p-6 border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h3
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Advantages and Disadvantages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Advantages */}
          <div>
            <h4
              className={`font-semibold mb-3 flex items-center ${
                isDarkMode ? "text-green-300" : "text-green-700"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Advantages
            </h4>
            <ul
              className={`space-y-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {[
                "Simple implementation with minimal code",
                "Works well for small datasets",
                "Stable sorting algorithm (preserves order of equal elements)",
                "In-place algorithm (requires O(1) extra space)",
                "Easy to detect if array is already sorted",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
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
          <div>
            <h4
              className={`font-semibold mb-3 flex items-center ${
                isDarkMode ? "text-red-300" : "text-red-700"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Disadvantages
            </h4>
            <ul
              className={`space-y-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {[
                "Inefficient for large datasets (O(n²) time complexity)",
                "Significantly slower than more advanced algorithms like QuickSort, MergeSort, or HeapSort",
                "Always makes O(n²) comparisons even if the array is already sorted",
                "Each element is potentially moved many times before reaching its final position",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
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
        </div>
      </div>
    </div>
  );
};

export default ConceptContent;
