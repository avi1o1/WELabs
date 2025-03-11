import React, { useState, useEffect, useRef } from "react";

interface PracticeContentProps {
  isDarkMode?: boolean;
}

const PracticeContent: React.FC<PracticeContentProps> = ({
  isDarkMode = false,
}) => {
  // States for interactive practice
  const [array, setArray] = useState<number[]>([5, 8, 3, 9, 1, 7]);
  const [passIndex, setPassIndex] = useState<number>(0);
  const [compareIndex, setCompareIndex] = useState<number>(0);
  const [swapsInCurrentPass, setSwapsInCurrentPass] = useState<number>(0);
  const [totalSwaps, setTotalSwaps] = useState<number>(0);
  const [totalComparisons, setTotalComparisons] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>(
    "Compare the highlighted elements. Should they be swapped?"
  );
  const [feedbackType, setFeedbackType] = useState<
    "info" | "success" | "error"
  >("info");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [sortingHistory, setSortingHistory] = useState<
    Array<{
      array: number[];
      pass: number;
      swaps: number;
      action: string;
    }>
  >([]);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [hintUsed, setHintUsed] = useState<boolean>(false);

  const initialArray = useRef<number[]>([...array]);

  // Generate a new random array
  const generateNewArray = () => {
    const min = 1;
    const max = 15;
    const length = 6;
    const newArray = Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
    initialArray.current = [...newArray];

    // Reset everything
    setArray([...newArray]);
    setPassIndex(0);
    setCompareIndex(0);
    setSwapsInCurrentPass(0);
    setTotalSwaps(0);
    setTotalComparisons(0);
    setCurrentStep(0);
    setIsCorrect(null);
    setFeedback("Compare the highlighted elements. Should they be swapped?");
    setFeedbackType("info");
    setIsComplete(false);
    setScore(0);
    setMistakes(0);
    setHintUsed(false);

    // Record initial state in history
    setSortingHistory([
      {
        array: [...newArray],
        pass: 0,
        swaps: 0,
        action: "Initial array",
      },
    ]);
  };

  // Initialize array on component mount
  useEffect(() => {
    // Record initial state in history
    setSortingHistory([
      {
        array: [...array],
        pass: 0,
        swaps: 0,
        action: "Initial array",
      },
    ]);
  }, []);

  // Function to reset practice with the same array
  const resetPractice = () => {
    setArray([...initialArray.current]);
    setPassIndex(0);
    setCompareIndex(0);
    setSwapsInCurrentPass(0);
    setTotalSwaps(0);
    setTotalComparisons(0);
    setCurrentStep(0);
    setIsCorrect(null);
    setFeedback("Compare the highlighted elements. Should they be swapped?");
    setFeedbackType("info");
    setIsComplete(false);
    setScore(0);
    setMistakes(0);
    setHintUsed(false);

    // Reset history
    setSortingHistory([
      {
        array: [...initialArray.current],
        pass: 0,
        swaps: 0,
        action: "Initial array",
      },
    ]);
  };

  // Function to handle user decision on swapping
  const handleUserDecision = (shouldSwap: boolean) => {
    if (isComplete) return;

    // Increment comparison counter
    setTotalComparisons((prev) => prev + 1);

    // Check if current elements need to be swapped
    const needsSwap = array[compareIndex] > array[compareIndex + 1];

    // Check if user's decision was correct
    const isUserCorrect = shouldSwap === needsSwap;
    setIsCorrect(isUserCorrect);

    if (isUserCorrect) {
      // User was correct
      setScore((prev) => prev + 1);
      setFeedback(
        needsSwap
          ? "Correct! The elements should be swapped since they are in the wrong order."
          : "Correct! The elements are already in the right order."
      );
      setFeedbackType("success");

      // Perform the action (swap or don't swap)
      if (needsSwap) {
        // Swap elements
        const newArray = [...array];
        [newArray[compareIndex], newArray[compareIndex + 1]] = [
          newArray[compareIndex + 1],
          newArray[compareIndex],
        ];
        setArray(newArray);
        setSwapsInCurrentPass((prev) => prev + 1);
        setTotalSwaps((prev) => prev + 1);

        // Record in history
        setSortingHistory((prev) => [
          ...prev,
          {
            array: [...newArray],
            pass: passIndex + 1,
            swaps: swapsInCurrentPass + 1,
            action: `Swapped ${array[compareIndex]} and ${
              array[compareIndex + 1]
            }`,
          },
        ]);
      } else {
        // No swap needed
        // Still record in history with the same array
        setSortingHistory((prev) => [
          ...prev,
          {
            array: [...array],
            pass: passIndex + 1,
            swaps: swapsInCurrentPass,
            action: `Compared ${array[compareIndex]} and ${
              array[compareIndex + 1]
            } (no swap)`,
          },
        ]);
      }

      // Move to next comparison
      moveToNextComparison();
    } else {
      // User was wrong
      setMistakes((prev) => prev + 1);
      setFeedback(
        needsSwap
          ? "Not quite. When the left element is greater than the right element, they should be swapped."
          : "Not quite. When the left element is less than or equal to the right element, they stay in place."
      );
      setFeedbackType("error");

      // Don't move to next comparison yet
    }
  };

  // Function to move to the next comparison
  const moveToNextComparison = () => {
    // Increment step counter
    setCurrentStep((prev) => prev + 1);

    // Reset correct/incorrect state
    setIsCorrect(null);

    // Reset feedback
    setFeedback("Compare the highlighted elements. Should they be swapped?");
    setFeedbackType("info");

    // Check if we're at the end of the current pass
    if (compareIndex >= array.length - passIndex - 2) {
      // End of pass reached

      // Move to next pass
      setPassIndex((prev) => prev + 1);
      setCompareIndex(0);
      setSwapsInCurrentPass(0);

      // Check if sorting is complete
      if (passIndex >= array.length - 2) {
        setIsComplete(true);
        setFeedback(
          `Congrats! You've completed the bubble sort with ${totalSwaps} swaps and ${mistakes} mistakes.`
        );
        setFeedbackType("success");
      }
    } else {
      // Move to next comparison in current pass
      setCompareIndex((prev) => prev + 1);
    }
  };

  // Function to handle retry after incorrect answer
  const handleRetry = () => {
    setIsCorrect(null);
    setFeedback("Compare the highlighted elements. Should they be swapped?");
    setFeedbackType("info");
  };

  // Function to use a hint
  const useHint = () => {
    setHintUsed(true);
    const leftElement = array[compareIndex];
    const rightElement = array[compareIndex + 1];

    setFeedback(
      `Hint: Compare ${leftElement} and ${rightElement}. In bubble sort, we swap when the left element is greater than the right element (${leftElement} > ${rightElement}).`
    );
    setFeedbackType("info");
  };

  // Check if the element is sorted
  const isSorted = (index: number) => {
    return index >= array.length - passIndex;
  };

  // Get element status for styling
  const getElementStatus = (index: number) => {
    if (isComplete) return "sorted";
    if (index >= array.length - passIndex) return "sorted";
    if (index === compareIndex || index === compareIndex + 1)
      return "comparing";
    return "unsorted";
  };

  return (
    <div className="space-y-8">
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
            <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-4">Practice Bubble Sort</h2>
          <p className="max-w-3xl text-lg">
            Test your understanding by making sorting decisions step-by-step.
          </p>
        </div>
      </div>

      {/* Instructions Card */}
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
            How to Practice
          </h3>
        </div>

        <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
          <p className="mb-3">
            In this practice session, you'll make decisions to implement the
            bubble sort algorithm:
          </p>
          <ol className="list-decimal ml-6 space-y-1 mb-4">
            <li>Two elements will be highlighted for comparison</li>
            <li>Decide whether they should be swapped or kept in place</li>
            <li>If you're wrong, you'll get feedback and a chance to retry</li>
            <li>After each pass, the largest values will be locked in place</li>
          </ol>
          <p>
            Remember: In bubble sort, adjacent elements are swapped if they're
            in the wrong order (left &gt; right).
          </p>
        </div>
      </div>

      {/* Interactive Practice Card */}
      <div
        className={`rounded-xl shadow-md overflow-hidden border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`px-5 py-4 border-b ${
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
              Sort This Array
            </h3>
          </div>
        </div>

        <div className="p-6">
          {/* Controls and Stats */}
          <div className="flex flex-wrap gap-3 mb-6 justify-between">
            {/* Left Side Controls */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={generateNewArray}
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
                New Array
              </button>
              <button
                onClick={resetPractice}
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
              {!isComplete && !isCorrect && !hintUsed && (
                <button
                  onClick={useHint}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center ${
                    isDarkMode
                      ? "bg-yellow-700 hover:bg-yellow-600 text-white"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" />
                  </svg>
                  Hint
                </button>
              )}
            </div>

            {/* Right Side Stats */}
            <div
              className={`flex gap-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <div className="text-sm">
                <span className="font-semibold">Pass:</span> {passIndex + 1}/
                {array.length}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Swaps:</span> {totalSwaps}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Score:</span> {score}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Mistakes:</span> {mistakes}
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div
            className={`p-4 rounded-lg mb-6 ${
              feedbackType === "success"
                ? isDarkMode
                  ? "bg-green-900/30 text-green-300"
                  : "bg-green-100 text-green-700"
                : feedbackType === "error"
                ? isDarkMode
                  ? "bg-red-900/30 text-red-300"
                  : "bg-red-100 text-red-700"
                : isDarkMode
                ? "bg-blue-900/30 text-blue-300"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            <p>{feedback}</p>
          </div>

          {/* Visualization */}
          <div
            className={`p-6 rounded-lg mb-6 min-h-[180px] flex items-end justify-center gap-3 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            {array.map((value, idx) => {
              const status = getElementStatus(idx);

              // Determine the color based on the element's state
              let colorClasses;
              if (status === "sorted") {
                colorClasses = isDarkMode
                  ? "bg-gradient-to-br from-green-600 to-emerald-800"
                  : "bg-gradient-to-br from-green-500 to-emerald-600";
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
                  key={`bar-${idx}`}
                  className={`relative flex flex-col items-center ${
                    status === "comparing" && "z-10"
                  }`}
                >
                  <div
                    className={`${colorClasses} rounded-md w-12 sm:w-16 flex items-center justify-center shadow-md
                      ${
                        status === "comparing" ? "ring-2 ring-yellow-400" : ""
                      }`}
                    style={{
                      height: `${value * 8 + 30}px`,
                      transition:
                        "height 0.4s ease-in-out, transform 0.2s ease-in-out",
                      transform:
                        status === "comparing" ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <span className="text-white font-bold text-lg">
                      {value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decision Buttons */}
          {!isComplete && (
            <div
              className={`flex justify-center gap-4 mb-6 ${
                isCorrect === false ? "animate-pulse" : ""
              }`}
            >
              {isCorrect === false ? (
                <button
                  onClick={handleRetry}
                  className={`px-6 py-2 rounded-md text-base font-medium transition-colors ${
                    isDarkMode
                      ? "bg-amber-700 hover:bg-amber-600 text-white"
                      : "bg-amber-600 hover:bg-amber-700 text-white"
                  }`}
                >
                  Try Again
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleUserDecision(true)}
                    className={`px-6 py-2 rounded-md text-base font-medium transition-colors ${
                      isDarkMode
                        ? "bg-purple-700 hover:bg-purple-600 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                    disabled={isCorrect !== null}
                  >
                    Swap Elements
                  </button>
                  <button
                    onClick={() => handleUserDecision(false)}
                    className={`px-6 py-2 rounded-md text-base font-medium transition-colors ${
                      isDarkMode
                        ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                    disabled={isCorrect !== null}
                  >
                    Don't Swap
                  </button>
                </>
              )}
            </div>
          )}

          {/* Continue Button (only shown when correct answer was given) */}
          {isCorrect === true && !isComplete && (
            <div className="flex justify-center">
              <button
                onClick={moveToNextComparison}
                className={`px-6 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode
                    ? "bg-green-700 hover:bg-green-600 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                Continue
              </button>
            </div>
          )}

          {/* Complete Message */}
          {isComplete && (
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`text-center p-4 rounded-lg ${
                  isDarkMode
                    ? "bg-green-900/30 text-green-300"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <h4 className="font-bold mb-1">Sorting Complete!</h4>
                <p>Great job! You've successfully sorted the array.</p>
                <p className="mt-2">
                  <span className="font-semibold">Final Score:</span> {score}{" "}
                  correct decisions
                  <span className="mx-2">•</span>
                  <span className="font-semibold">Mistakes:</span> {mistakes}
                </p>
              </div>
              <button
                onClick={generateNewArray}
                className={`px-6 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode
                    ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                Try Another Array
              </button>
            </div>
          )}

          {/* Legend */}
          <div
            className={`flex flex-wrap gap-4 justify-center text-sm mt-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                }`}
              ></div>
              <span>Currently Comparing</span>
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
      </div>

      {/* Sorting History Table */}
      {sortingHistory.length > 1 && (
        <div
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Your Sorting Steps
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table
              className={`min-w-full border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <thead>
                <tr className={isDarkMode ? "bg-gray-900" : "bg-gray-100"}>
                  <th
                    className={`py-2 px-3 text-left border ${
                      isDarkMode
                        ? "border-gray-700 text-gray-300"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    Step
                  </th>
                  <th
                    className={`py-2 px-3 text-left border ${
                      isDarkMode
                        ? "border-gray-700 text-gray-300"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    Action
                  </th>
                  <th
                    className={`py-2 px-3 text-left border ${
                      isDarkMode
                        ? "border-gray-700 text-gray-300"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    Array State
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortingHistory.map((entry, index) => (
                  <tr
                    key={index}
                    className={
                      index === sortingHistory.length - 1
                        ? isDarkMode
                          ? "bg-blue-900/30"
                          : "bg-blue-50"
                        : ""
                    }
                  >
                    <td
                      className={`py-2 px-3 border ${
                        isDarkMode
                          ? "border-gray-700 text-gray-300"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {index}
                    </td>
                    <td
                      className={`py-2 px-3 border ${
                        isDarkMode
                          ? "border-gray-700 text-gray-300"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {entry.action}
                    </td>
                    <td
                      className={`py-2 px-3 border font-mono text-sm ${
                        isDarkMode
                          ? "border-gray-700 text-gray-300"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      [
                      {entry.array.map((num, idx) => (
                        <span key={idx}>
                          {idx > 0 && ", "}
                          <span
                            className={
                              idx >= entry.array.length - entry.pass
                                ? isDarkMode
                                  ? "bg-green-900/40 px-1"
                                  : "bg-green-100 px-1"
                                : ""
                            }
                          >
                            {num}
                          </span>
                        </span>
                      ))}
                      ]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reminder Card */}
      <div
        className={`rounded-xl shadow-md p-6 border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-yellow-900/40" : "bg-yellow-100"
            }`}
          >
            <svg
              className={`w-6 h-6 ${
                isDarkMode ? "text-yellow-400" : "text-yellow-600"
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
            Bubble Sort Reminders
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              When to Swap
            </h4>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Swap elements when they are in the wrong order - specifically,
              when the left element is greater than the right element.
            </p>
            <div className="flex items-center mt-3 gap-2">
              <div
                className={`p-2 rounded ${
                  isDarkMode ? "bg-red-900/30" : "bg-red-100"
                }`}
              >
                <span className={isDarkMode ? "text-red-300" : "text-red-700"}>
                  7
                </span>
              </div>
              <svg
                className={`w-4 h-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div
                className={`p-2 rounded ${
                  isDarkMode ? "bg-green-900/30" : "bg-green-100"
                }`}
              >
                <span
                  className={isDarkMode ? "text-green-300" : "text-green-700"}
                >
                  3
                </span>
              </div>
              <span
                className={`ml-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                ← Since 7 &gt; 3, swap them
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              When NOT to Swap
            </h4>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Keep elements in place when they are already in the correct order
              - specifically, when the left element is less than or equal to the
              right element.
            </p>
            <div className="flex items-center mt-3 gap-2">
              <div
                className={`p-2 rounded ${
                  isDarkMode ? "bg-green-900/30" : "bg-green-100"
                }`}
              >
                <span
                  className={isDarkMode ? "text-green-300" : "text-green-700"}
                >
                  4
                </span>
              </div>
              <svg
                className={`w-4 h-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div
                className={`p-2 rounded ${
                  isDarkMode ? "bg-green-900/30" : "bg-green-100"
                }`}
              >
                <span
                  className={isDarkMode ? "text-green-300" : "text-green-700"}
                >
                  8
                </span>
              </div>
              <span
                className={`ml-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                ← Since 4 &lt; 8, keep as is
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeContent;
