import React, { useEffect, useRef, useState } from "react";

interface AlgorithmContentProps {
  isDarkMode?: boolean;
}

const AlgorithmContent: React.FC<AlgorithmContentProps> = ({
  isDarkMode = false,
}) => {
  // Interactive Bubble Sort Implementation
  function EnhancedBubbleSortAnimation() {
    const [array, setArray] = useState<number[]>([5, 3, 9, 1, 7, 4]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [passIndex, setPassIndex] = useState<number>(0);
    const [compareIndex, setCompareIndex] = useState<number>(0);
    const [swapsInCurrentPass, setSwapsInCurrentPass] = useState<number>(0);
    const [totalSwaps, setTotalSwaps] = useState<number>(0);
    const [isComparing, setIsComparing] = useState<boolean>(false);
    const [isSwapping, setIsSwapping] = useState<boolean>(false);
    const [isAutoSorting, setIsAutoSorting] = useState<boolean>(false);
    const [sortingSpeed, setSortingSpeed] = useState<number>(500);
    const [sortingHistory, setSortingHistory] = useState<
      Array<{
        array: number[];
        pass: number;
        swaps: number;
      }>
    >([]);
    const [isSorted, setIsSorted] = useState<boolean>(false);

    const initialArray = useRef<number[]>([...array]);

    // Generate a new random array
    const generateNewArray = () => {
      resetSorting();
      const min = 1;
      const max = 12;
      const length = 8;
      const newArray = Array.from(
        { length },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
      initialArray.current = [...newArray];
      setArray([...newArray]);

      // Record initial state in history
      setSortingHistory([
        {
          array: [...newArray],
          pass: 0,
          swaps: 0,
        },
      ]);
    };

    // Reset the sorting process
    const resetSorting = () => {
      setArray([...initialArray.current]);
      setCurrentStep(0);
      setPassIndex(0);
      setCompareIndex(0);
      setSwapsInCurrentPass(0);
      setTotalSwaps(0);
      setIsComparing(false);
      setIsSwapping(false);
      setIsAutoSorting(false);
      setIsSorted(false);
      setSortingHistory([
        {
          array: [...initialArray.current],
          pass: 0,
          swaps: 0,
        },
      ]);
    };

    // Perform one step of bubble sort
    const nextStep = () => {
      if (isSorted) return;

      // If we're currently displaying a comparison
      if (isComparing) {
        const arr = [...array];
        // If the current pair needs swapping
        if (arr[compareIndex] > arr[compareIndex + 1]) {
          setIsSwapping(true);
          // Swap elements
          [arr[compareIndex], arr[compareIndex + 1]] = [
            arr[compareIndex + 1],
            arr[compareIndex],
          ];
          setArray(arr);
          setSwapsInCurrentPass((prev) => prev + 1);
          setTotalSwaps((prev) => prev + 1);
        }

        // Move to next pair
        setIsComparing(false);

        // If we've reached the end of this pass
        if (compareIndex >= array.length - passIndex - 1) {
          // Record this pass in history
          setSortingHistory((prev) => [
            ...prev,
            {
              array: [...arr],
              pass: passIndex + 1,
              swaps: swapsInCurrentPass,
            },
          ]);

          // Move to next pass
          setPassIndex((prev) => prev + 1);
          setCompareIndex(0);
          setSwapsInCurrentPass(0);

          // Check if we're done
          if (passIndex >= array.length - 1) {
            setIsSorted(true);
            setIsAutoSorting(false);
          }
        } else {
          // Move to next pair in current pass
          setCompareIndex((prev) => prev + 1);
        }
      } else {
        // Start comparing the next pair
        setIsComparing(true);

        // If we've completed all passes
        if (passIndex >= array.length - 1) {
          setIsSorted(true);
          setIsAutoSorting(false);
          return;
        }
      }

      setCurrentStep((prev) => prev + 1);
    };

    // Auto-complete sorting
    useEffect(() => {
      let timer: NodeJS.Timeout;

      if (isAutoSorting && !isSorted) {
        timer = setTimeout(() => {
          nextStep();
        }, sortingSpeed);
      }

      return () => clearTimeout(timer);
    }, [isAutoSorting, array, compareIndex, passIndex, isComparing, isSorted]);

    // Initialize array on component mount
    useEffect(() => {
      // Record initial state in history
      setSortingHistory([
        {
          array: [...array],
          pass: 0,
          swaps: 0,
        },
      ]);
    }, []);

    // Toggle auto sorting
    const toggleAutoSort = () => {
      if (isSorted) return;
      setIsAutoSorting(!isAutoSorting);
    };

    // Get element status for styling
    const getElementStatus = (index: number) => {
      if (isSorted) return "sorted";
      if (index >= array.length - passIndex) return "sorted";
      if (isComparing && (index === compareIndex || index === compareIndex + 1))
        return "comparing";
      if (isSwapping && (index === compareIndex || index === compareIndex + 1))
        return "swapping";
      return "unsorted";
    };

    return (
      <div className="space-y-4 max-w-full px-2 sm:px-4">
        {/* Controls - Refactored for mobile */}
        <div className="flex flex-col gap-4">
          {/* Info Section */}
          <div className="flex flex-wrap justify-between gap-3">
            <div className="space-y-1">
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <span className="font-semibold">Pass:</span> {passIndex + 1}/
                {array.length}
              </div>
              <div className="flex gap-4">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  <span className="font-semibold">Steps:</span> {currentStep}
                </span>
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-amber-300" : "text-amber-700"
                  }`}
                >
                  <span className="font-semibold">Swaps:</span> {totalSwaps}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-24 sm:w-32 md:w-40 flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${Math.min(
                      (passIndex / (array.length - 1)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Control Buttons - Improved for mobile */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <button
              onClick={toggleAutoSort}
              disabled={isSorted}
              className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center ${
                isDarkMode
                  ? isSorted
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : isSorted
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {isAutoSorting ? (
                <>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 4H6v16h4V4zm8 0h-4v16h4V4z" />
                  </svg>
                  <span className="whitespace-nowrap">Pause</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="whitespace-nowrap">Play</span>
                </>
              )}
            </button>
            <button
              onClick={nextStep}
              disabled={isSorted}
              className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center ${
                isDarkMode
                  ? isSorted
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : isSorted
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.5 15.584V8.416a.5.5 0 01.77-.42l5.576 3.583a.5.5 0 010 .842l-5.576 3.584a.5.5 0 01-.77-.42z" />
              </svg>
              <span className="whitespace-nowrap">Step</span>
            </button>
            <button
              onClick={resetSorting}
              className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
              <span className="whitespace-nowrap">Reset</span>
            </button>
            <button
              onClick={generateNewArray}
              className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center ${
                isDarkMode
                  ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm-9.09 12.74L12 10.15l2.59 2.59L13.17 14 18 14.01v-4.84l-1.42 1.42L12 6l-7.59 7.59 1 1.15z" />
              </svg>
              <span className="whitespace-nowrap">Randomize</span>
            </button>
          </div>
        </div>

        {/* Speed Control - Improved for mobile */}
        <div
          className={`flex items-center gap-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <span className="text-xs sm:text-sm whitespace-nowrap">Speed:</span>
          <input
            type="range"
            min="100"
            max="1000"
            value={1100 - sortingSpeed}
            onChange={(e) => setSortingSpeed(1100 - parseInt(e.target.value))}
            className="flex-1 max-w-xs h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs sm:text-sm whitespace-nowrap">
            {sortingSpeed < 200
              ? "Fast"
              : sortingSpeed < 600
              ? "Medium"
              : "Slow"}
          </span>
        </div>

        {/* Array Blocks - Adjusted for mobile */}
        <div className="py-4 sm:py-6 flex items-end justify-center min-h-[140px] sm:min-h-[180px] overflow-x-auto">
          <div className="flex space-x-1 sm:space-x-3 items-end px-2">
            {array.map((num, idx) => {
              const status = getElementStatus(idx);

              // Determine the color based on the element's state
              let colorClasses;
              if (status === "sorted") {
                colorClasses = isDarkMode
                  ? "bg-gradient-to-br from-green-600 to-emerald-800"
                  : "bg-gradient-to-br from-green-500 to-emerald-600";
              } else if (status === "swapping") {
                colorClasses = "bg-gradient-to-br from-amber-500 to-yellow-600";
              } else if (status === "comparing") {
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
                    status === "swapping" ? "animate-bounce" : ""
                  }`}
                >
                  {/* Adjusted block sizes for mobile */}
                  <div
                    className={`${colorClasses} relative rounded-md w-8 sm:w-12 md:w-16 flex items-center justify-center shadow-md
                    ${
                      status === "comparing" || status === "swapping"
                        ? "ring-2 ring-yellow-400 z-10"
                        : ""
                    }
                    ${status === "swapping" && "z-20"}`}
                    style={{
                      height: `${num * 8 + 20}px`,
                      transition:
                        "height 0.4s ease-in-out, transform 0.2s ease-in-out",
                      transform:
                        status === "swapping" ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {/* Smaller text on mobile */}
                    <span className="text-white font-bold text-sm sm:text-lg">
                      {num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation Legend - Improved for mobile */}
        <div
          className={`flex flex-wrap gap-2 sm:gap-4 justify-center text-xs sm:text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                isDarkMode ? "bg-blue-600" : "bg-blue-500"
              }`}
            ></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                isDarkMode ? "bg-amber-500" : "bg-amber-500"
              }`}
            ></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                isDarkMode ? "bg-green-600" : "bg-green-500"
              }`}
            ></div>
            <span>Sorted</span>
          </div>
        </div>

        {/* Sorting History Table - Responsive improvements */}
        {sortingHistory.length > 1 && (
          <div
            className={`mt-6 sm:mt-8 rounded-lg overflow-hidden border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div
              className={`p-2 sm:p-3 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <h4
                className={`font-semibold text-sm sm:text-base ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Sorting Progress
              </h4>
              <p
                className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                See how the array changes after each pass
              </p>
            </div>
            <div className="overflow-x-auto">
              <table
                className={`min-w-full border text-xs sm:text-sm ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <thead>
                  <tr className={isDarkMode ? "bg-gray-900" : "bg-gray-100"}>
                    <th
                      className={`py-1 sm:py-2 px-2 sm:px-3 text-left border ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      Pass
                    </th>
                    <th
                      className={`py-1 sm:py-2 px-2 sm:px-3 text-left border ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      Array State
                    </th>
                    <th
                      className={`py-1 sm:py-2 px-2 sm:px-3 text-center border ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      Sorted
                    </th>
                    <th
                      className={`py-1 sm:py-2 px-2 sm:px-3 text-center border ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      Swaps
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortingHistory.map((entry, index) => (
                    <tr
                      key={index}
                      className={
                        passIndex === index
                          ? isDarkMode
                            ? "bg-blue-900/30"
                            : "bg-blue-50"
                          : ""
                      }
                    >
                      <td
                        className={`py-1 sm:py-2 px-2 sm:px-3 border text-center ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        {index === 0 ? "Init" : index}
                      </td>
                      <td
                        className={`py-1 sm:py-2 px-2 sm:px-3 border font-mono ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        } overflow-x-auto`}
                      >
                        [
                        {entry.array.map((num, idx) => (
                          <span key={idx}>
                            {idx > 0 && ", "}
                            <span
                              className={
                                idx >= entry.array.length - index
                                  ? isDarkMode
                                    ? "bg-green-900/40 px-0.5 sm:px-1"
                                    : "bg-green-100 px-0.5 sm:px-1"
                                  : ""
                              }
                            >
                              {num}
                            </span>
                          </span>
                        ))}
                        ]
                      </td>
                      <td
                        className={`py-1 sm:py-2 px-2 sm:px-3 border text-center ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        {index}
                      </td>
                      <td
                        className={`py-1 sm:py-2 px-2 sm:px-3 border text-center ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        {index === 0 ? "-" : entry.swaps}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-4">Bubble Sort</h2>
          <p className="max-w-3xl text-lg mb-6">
            A simple comparison-based sorting algorithm that repeatedly steps
            through the list, compares adjacent elements, and swaps them if
            they're in the wrong order.
          </p>
        </div>
      </div>

      {/* Algorithm Section */}
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-bold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Algorithm of Bubble Sort
          </h3>
        </div>

        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <p
            className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Let's examine the consolidated algorithm to sort an array of N
            elements:
          </p>

          <ol
            className={`list-decimal ml-6 mb-4 space-y-3 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <li>
              Start with the first element (index 0) and compare it with the
              next element (index 1).
            </li>
            <li>
              If the first element is greater than the second element, swap
              them.
            </li>
            <li>
              Move to the next element (index 1) and compare it with the
              following element (index 2). Continue this process until the end
              of the array.
            </li>
            <li>
              After the first pass, the largest element will be at the last
              position.
            </li>
            <li>
              Repeat the process for the remaining n-1 elements, then n-2
              elements, and so on.
            </li>
            <li>
              Run a total of N-1 passes to ensure the entire array is sorted.
            </li>
          </ol>

          <div
            className={`mt-6 p-4 rounded-lg ${
              isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
            } border ${isDarkMode ? "border-blue-900" : "border-blue-100"}`}
          >
            <h4
              className={`font-semibold mb-2 ${
                isDarkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Key Observation
            </h4>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              After the Tth iteration, the Tth largest element will be placed at
              its correct position. With N elements, we need N-1 iterations to
              completely sort the array. After placing N-1 elements correctly,
              the last element will automatically be in its correct position.
            </p>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            <ol className="space-y-3 mb-4 list-decimal list-inside">
              <li>Start at the beginning of the array.</li>
              <li>Compare each pair of adjacent elements in the list.</li>
              <li>Swap them if they are in the wrong order.</li>
              <li>Move to the next pair and repeat.</li>
              <li>
                After each pass, the largest element "bubbles up" to its correct
                position.
              </li>
              <li>Repeat until the entire list is sorted.</li>
            </ol>

            <div
              className={`p-4 rounded-lg mt-4 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <h4 className="font-semibold mb-2">Key Observations</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  After the first pass, the largest element is at the end.
                </li>
                <li>
                  Each pass moves the next largest element to its correct
                  position.
                </li>
                <li>
                  The algorithm is stable (preserves order of equal elements).
                </li>
                <li>It sorts in-place without requiring extra memory.</li>
              </ul>
            </div>
          </div>

          <div className={'flex flex-col justify-end'}>
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Step-by-Step Example
            </h4>
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Let's see one iteration on array [5, 3, 8, 4, 2]:
              </p>
              <ol
                className={`mt-3 space-y-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li className="flex items-start">
                  <span
                    className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                      isDarkMode
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    1
                  </span>
                  <span>
                    <strong>Compare 5 and 3:</strong> Swap to get [3, 5, 8, 4,
                    2]
                  </span>
                </li>
                <li className="flex items-start">
                  <span
                    className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                      isDarkMode
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    2
                  </span>
                  <span>
                    <strong>Compare 5 and 8:</strong> No swap; array remains [3,
                    5, 8, 4, 2]
                  </span>
                </li>
                <li className="flex items-start">
                  <span
                    className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                      isDarkMode
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    3
                  </span>
                  <span>
                    <strong>Compare 8 and 4:</strong> Swap to get [3, 5, 4, 8,
                    2]
                  </span>
                </li>
                <li className="flex items-start">
                  <span
                    className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                      isDarkMode
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    4
                  </span>
                  <span>
                    <strong>Compare 8 and 2:</strong> Swap to get [3, 5, 4, 2,
                    8]
                  </span>
                </li>
              </ol>
              <p
                className={`mt-3 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Now, the largest element (8) is in its proper position. The
                algorithm will repeat for the remaining elements.
              </p>
            </div>
          </div>
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
              Interactive Animation
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

      {/* Video */}
      <div className="mt-6 bg-black/20 rounded-xl overflow-hidden shadow-xl">
        <div className="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/ph-C6sUyzE4?si=gAYhBlJkxkrHVFjT"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
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

export default AlgorithmContent;
