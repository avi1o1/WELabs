import React, { useState, useEffect, useRef } from "react";
import { Highlight as PrismHighlight } from "prism-react-renderer";

const OptimizationVisualizer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [array, setArray] = useState([5, 3, 8, 4, 2, 7]);
  const [currentPass, setCurrentPass] = useState(0);
  const [compareIndices, setCompareIndices] = useState([-1, -1]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [showComparisons, setShowComparisons] = useState(true);
  const comparisonsRef = useRef({ standard: 0, optimized: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sortingCompleteRef = useRef(false);

  // Clean up the timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Effect for autoplay
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isPlaying && !sortingCompleteRef.current) {
      timer = setTimeout(() => {
        executeNextStep();
      }, 700);

      timerRef.current = timer;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, stepCount]); // Adding stepCount as dependency to re-run after each step

  const resetVisualization = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setArray([5, 3, 8, 4, 2, 7]);
    setCurrentPass(0);
    setCompareIndices([-1, -1]);
    setSortedIndices([]);
    setStepCount(0);
    comparisonsRef.current = { standard: 0, optimized: 0 };
    sortingCompleteRef.current = false;
  };

  const togglePlay = () => {
    if (sortingCompleteRef.current) {
      resetVisualization();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const executeNextStep = () => {
    if (sortingCompleteRef.current) {
      setIsPlaying(false);
      return;
    }

    const arr = [...array];
    const n = arr.length;

    // Get current comparison indices based on the current pass
    let i = currentPass;
    let j = compareIndices[0] === -1 ? 0 : compareIndices[0];

    // If we're at the end of the current pass
    if (j >= n - i - 1) {
      // Mark the last element of this pass as sorted
      setSortedIndices((prev) => [...prev, n - i - 1]);

      // Move to next pass
      setCurrentPass((prev) => prev + 1);
      setCompareIndices([0, 1]);

      // Check if we've completed all passes
      if (i >= n - 1) {
        sortingCompleteRef.current = true;
        setIsPlaying(false);
        return;
      }
    } else {
      // Count standard bubble sort comparison
      comparisonsRef.current.standard++;

      // Count optimized bubble sort comparison only if not in the sorted portion
      if (j < n - i - 1) {
        comparisonsRef.current.optimized++;

        // Compare elements
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray(arr);
        }
      }

      // Move to next comparison
      setCompareIndices([j + 1, j + 2]);
    }

    setStepCount((prev) => prev + 1);
  };

  const getElementColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return isDarkMode ? "bg-green-800" : "bg-green-500";
    }
    if (compareIndices.includes(index)) {
      return isDarkMode ? "bg-blue-700" : "bg-blue-500";
    }
    return isDarkMode ? "bg-gray-700" : "bg-gray-300";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex space-x-2">
          <button
            onClick={togglePlay}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isDarkMode
                ? "bg-blue-700 hover:bg-blue-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isPlaying
              ? "Pause"
              : sortingCompleteRef.current
              ? "Restart"
              : "Play"}
          </button>
          <button
            onClick={resetVisualization}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            Reset
          </button>
          <button
            onClick={() => !isPlaying && executeNextStep()}
            disabled={isPlaying || sortingCompleteRef.current}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isPlaying || sortingCompleteRef.current
                ? isDarkMode
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            Step
          </button>
        </div>
        <div className="text-sm">
          <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            Pass: {currentPass + 1}
          </span>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="flex justify-center py-6">
        <div className="flex items-end space-x-2">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 sm:w-10 flex items-center justify-center text-white font-bold rounded-t-md ${getElementColor(
                  index
                )}`}
                style={{ height: `${value * 20}px` }}
              >
                {value}
              </div>
              <div
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {index}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Statistics */}
      {showComparisons && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="flex flex-wrap justify-between mb-2">
            <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Comparison Count:
            </span>
            <div>
              <span
                className={`px-2 py-0.5 rounded-md mr-2 ${
                  isDarkMode
                    ? "bg-red-900/30 text-red-300"
                    : "bg-red-100 text-red-600"
                }`}
              >
                Standard: {comparisonsRef.current.standard}
              </span>
              <span
                className={`px-2 py-0.5 rounded-md ${
                  isDarkMode
                    ? "bg-green-900/30 text-green-300"
                    : "bg-green-100 text-green-600"
                }`}
              >
                Optimized: {comparisonsRef.current.optimized}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Sorted elements:
            </span>
            <span
              className={`font-medium ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              {sortedIndices.length} of {array.length}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } mr-1`}
          ></div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Unsorted
          </span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-blue-700" : "bg-blue-500"
            } mr-1`}
          ></div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Comparing
          </span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-green-800" : "bg-green-500"
            } mr-1`}
          ></div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sorted
          </span>
        </div>
      </div>
    </div>
  );
};

const EarlyTerminationVisualizer = ({
  isDarkMode,
}: {
  isDarkMode: boolean;
}) => {
  const [array, setArray] = useState([1, 2, 3, 5, 4, 6]);
  interface SortingStep {
    array: number[];
    comparing: number[];
    swapped: boolean;
    message: string;
    pass: number;
    passSwapCount: number;
    completed: boolean;
  }

  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("Click 'Play' to start");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate all the steps of bubble sort with early termination
  useEffect(() => {
    generateSortingSteps();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Effect for autoplay
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isPlaying && currentStep < sortingSteps.length - 1) {
      timer = setTimeout(() => {
        advanceStep();
      }, 1000);

      timerRef.current = timer;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStep, sortingSteps.length]); // Adding currentStep as dependency

  const advanceStep = () => {
    if (currentStep < sortingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMessage(sortingSteps[nextStep].message);

      // We remove the timer setting from here as it's handled by the useEffect
      if (nextStep === sortingSteps.length - 1) {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const generateSortingSteps = () => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    steps.push({
      array: [...arr],
      comparing: [-1, -1],
      swapped: false,
      message: "Starting bubble sort with early termination check",
      pass: 0,
      passSwapCount: 0,
      completed: false,
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      let passSwapCount = 0;

      for (let j = 0; j < n - i - 1; j++) {
        // Add comparison step
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: false,
          message: `Comparing elements at positions ${j} and ${j + 1}`,
          pass: i + 1,
          passSwapCount,
          completed: false,
        });

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          passSwapCount++;

          // Add swapping step
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapped: true,
            message: `Swapped elements at positions ${j} and ${j + 1}`,
            pass: i + 1,
            passSwapCount,
            completed: false,
          });
        }
      }

      // Add pass completed step
      steps.push({
        array: [...arr],
        comparing: [-1, -1],
        swapped: false,
        message: swapped
          ? `Pass ${i + 1} complete with ${passSwapCount} swaps`
          : `Pass ${i + 1} complete with no swaps - array is sorted!`,
        pass: i + 1,
        passSwapCount,
        completed: false,
      });

      // Early termination check
      if (!swapped) {
        steps.push({
          array: [...arr],
          comparing: [-1, -1],
          swapped: false,
          message: "Early termination: No swaps in this pass, array is sorted!",
          pass: i + 1,
          passSwapCount: 0,
          completed: true,
        });
        break;
      }
    }

    // Add final sorted step if not terminated early
    if (!steps[steps.length - 1].completed) {
      steps.push({
        array: [...arr],
        comparing: [-1, -1],
        swapped: false,
        message: "Sorting complete",
        pass: n,
        passSwapCount: 0,
        completed: true,
      });
    }

    setSortingSteps(steps);
  };

  const resetVisualization = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setArray([1, 2, 3, 5, 4, 6]);
    setCurrentStep(0);
    setIsPlaying(false);
    setMessage("Click 'Play' to start");
    generateSortingSteps();
  };

  const togglePlay = () => {
    if (currentStep === sortingSteps.length - 1) {
      resetVisualization();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const getElementColor = (index: number, step: SortingStep | undefined) => {
    if (!step) return isDarkMode ? "bg-gray-700" : "bg-gray-300";

    if (step.completed) {
      return isDarkMode ? "bg-green-800" : "bg-green-500";
    }

    if (step.comparing.includes(index)) {
      if (step.swapped) {
        return isDarkMode ? "bg-amber-700" : "bg-amber-500";
      }
      return isDarkMode ? "bg-blue-700" : "bg-blue-500";
    }

    return isDarkMode ? "bg-gray-700" : "bg-gray-300";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex space-x-2">
          <button
            onClick={togglePlay}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isDarkMode
                ? "bg-blue-700 hover:bg-blue-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isPlaying
              ? "Pause"
              : currentStep === sortingSteps.length - 1
              ? "Restart"
              : "Play"}
          </button>
          <button
            onClick={resetVisualization}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            Reset
          </button>
          <button
            onClick={() =>
              !isPlaying &&
              currentStep < sortingSteps.length - 1 &&
              advanceStep()
            }
            disabled={isPlaying || currentStep === sortingSteps.length - 1}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isPlaying || currentStep === sortingSteps.length - 1
                ? isDarkMode
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            Step
          </button>
        </div>
        {sortingSteps.length > 0 && currentStep < sortingSteps.length && (
          <div className="text-sm">
            <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Pass: {sortingSteps[currentStep].pass}
            </span>
          </div>
        )}
      </div>

      {/* Array Visualization */}
      <div className="flex justify-center py-6">
        <div className="flex items-end space-x-2">
          {sortingSteps.length > 0 && currentStep < sortingSteps.length
            ? sortingSteps[currentStep].array.map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 sm:w-10 flex items-center justify-center text-white font-bold rounded-t-md ${getElementColor(
                      index,
                      sortingSteps[currentStep]
                    )}`}
                    style={{ height: `${value * 20}px` }}
                  >
                    {value}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {index}
                  </div>
                </div>
              ))
            : array.map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 sm:w-10 flex items-center justify-center text-white font-bold rounded-t-md ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                    style={{ height: `${value * 20}px` }}
                  >
                    {value}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {index}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Status Message */}
      <div
        className={`p-3 rounded-md text-sm ${
          sortingSteps.length > 0 &&
          currentStep < sortingSteps.length &&
          sortingSteps[currentStep].completed
            ? isDarkMode
              ? "bg-green-900/30 text-green-300"
              : "bg-green-100 text-green-700"
            : isDarkMode
            ? "bg-gray-800 text-gray-300"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {message}
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } mr-1`}
          ></div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Unsorted
          </span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-blue-700" : "bg-blue-500"
            } mr-1`}
          ></div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Comparing
          </span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-amber-700" : "bg-amber-500"
            } mr-1`}
          ></div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Swapping
          </span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-green-800" : "bg-green-500"
            } mr-1`}
          ></div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sorted
          </span>
        </div>
      </div>
    </div>
  );
};

const OptimizationContent = ({ isDarkMode = false }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-purple-900 via-blue-950 to-indigo-900"
            : "bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600"
        } p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-4">
            Optimized Bubble Sort
          </h2>
          <p className="max-w-3xl text-lg mb-2">
            Making Bubble Sort more efficient by reducing unnecessary
            comparisons and adding early termination.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Optimization Techniques */}
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
              Optimization Techniques
            </h3>
          </div>

          <div
            className={`p-5 rounded-lg mb-4 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              After understanding how Bubble Sort works, we can make these key
              improvements:
            </p>

            <ul
              className={`list-disc ml-5 space-y-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>
                After the{" "}
                <strong>
                  T<sup>th</sup> iteration
                </strong>
                , the{" "}
                <strong>
                  T<sup>th</sup> largest element
                </strong>{" "}
                is already in its correct position.
              </li>
              <li>
                In the T<sup>th</sup> iteration, we only need to compare the
                first <strong>(N-T+1)</strong> elements, as the last (T-1)
                elements are already sorted.
              </li>
              <li>This reduces unnecessary comparisons in each pass.</li>
            </ul>
          </div>

          <div
            className={`p-5 rounded-lg ${
              isDarkMode
                ? "bg-blue-900/20 border border-blue-900/30"
                : "bg-blue-50 border border-blue-100"
            }`}
          >
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Early Termination
            </h4>
            <ul
              className={`list-disc ml-5 space-y-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>
                The array often gets sorted before all N iterations are
                completed.
              </li>
              <li>
                If we complete an entire pass without making any swaps, the
                array must be sorted.
              </li>
              <li>
                We can add a flag to track whether any swaps were made in a
                pass.
              </li>
              <li>
                When no swaps occur in a pass, we can terminate the algorithm
                early.
              </li>
              <li>
                For an already sorted array, this optimization allows us to
                finish in just one pass, giving us <strong>O(n)</strong> time
                complexity in the best case.
              </li>
            </ul>
          </div>
        </div>

        {/* Implementation & Benefits */}
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3
              className={`text-xl font-bold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Optimized Implementation
            </h3>
          </div>

          <div
            className={`p-4 rounded-lg mb-6 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <div
              className={`rounded-t-md px-4 py-2 font-medium ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              optimizedBubbleSort.js
            </div>
            <PrismHighlight
              code={`function optimizedBubbleSort(arr) {
  let n = arr.length;
  let swapped;
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    
    // Last i elements are already sorted
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping, array is sorted
    if (!swapped) break;
  }
  
  return arr;
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
            </PrismHighlight>
          </div>

          <div
            className={`p-5 rounded-lg ${
              isDarkMode
                ? "bg-amber-900/20 border border-amber-900/30"
                : "bg-amber-50 border border-amber-100"
            }`}
          >
            <h4
              className={`font-semibold mb-3 ${
                isDarkMode ? "text-amber-300" : "text-amber-700"
              }`}
            >
              Key Benefits
            </h4>
            <ul
              className={`space-y-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {[
                "Early termination when array becomes sorted",
                "Reduced comparisons by skipping already sorted elements",
                "Best case time complexity improves to O(n)",
                "Significant performance boost for partially sorted arrays",
                "Same simplicity as original algorithm with better efficiency",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span
                    className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 flex-shrink-0 ${
                      isDarkMode
                        ? "bg-amber-900/30 text-amber-300"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Visual Comparison Section */}
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
              Visual Comparison
            </h3>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Optimization Visualization
            </h4>
            <div
              className={`rounded-lg p-4 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <OptimizationVisualizer isDarkMode={isDarkMode} />
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Visualization showing how we reduce comparisons in each pass by
              skipping already sorted elements.
            </p>
          </div>

          <div className="space-y-4">
            <h4
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Early Termination Visualization
            </h4>
            <div
              className={`rounded-lg p-4 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <EarlyTerminationVisualizer isDarkMode={isDarkMode} />
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Visual example of how early termination works when no swaps occur
              in a pass.
            </p>
          </div>
        </div>
      </div>

      {/* Video Demonstrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <h3
              className={`font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Optimization Concept Demonstration
            </h3>
          </div>
          <div className="p-4">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64 sm:h-80 rounded-lg"
                src="https://www.youtube.com/embed/8Z2yvFHNnbk"
                title="Demonstration of Optimized Bubble Sort Concept"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

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
            <h3
              className={`font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Practical Example Walkthrough
            </h3>
          </div>
          <div className="p-4">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64 sm:h-80 rounded-lg"
                src="https://www.youtube.com/embed/UJvH3z_fw-4"
                title="Demonstration of Optimized Bubble Sort with Examples"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Comparison */}
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-bold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Complexity Comparison
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
                  className={`py-3 px-4 text-left font-semibold border ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  Metric
                </th>
                <th
                  className={`py-3 px-4 text-left font-semibold border ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  Standard Bubble Sort
                </th>
                <th
                  className={`py-3 px-4 text-left font-semibold border ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  Optimized Bubble Sort
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Best Case
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  O(n²)
                </td>
                <td
                  className={`py-3 px-4 border font-medium ${
                    isDarkMode
                      ? "border-gray-700 bg-green-900/20 text-green-300"
                      : "border-gray-200 bg-green-50 text-green-700"
                  }`}
                >
                  O(n)
                </td>
              </tr>
              <tr>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Average Case
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  O(n²)
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  O(n²)
                </td>
              </tr>
              <tr>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Worst Case
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  O(n²)
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  O(n²)
                </td>
              </tr>
              <tr>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Space Complexity
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  O(1)
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  O(1)
                </td>
              </tr>
              <tr>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Early Termination
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-red-300"
                      : "border-gray-200 text-red-600"
                  }`}
                >
                  No
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-green-300"
                      : "border-gray-200 text-green-600"
                  }`}
                >
                  Yes
                </td>
              </tr>
              <tr>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Skip Sorted Elements
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-red-300"
                      : "border-gray-200 text-red-600"
                  }`}
                >
                  No
                </td>
                <td
                  className={`py-3 px-4 border ${
                    isDarkMode
                      ? "border-gray-700 text-green-300"
                      : "border-gray-200 text-green-600"
                  }`}
                >
                  Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OptimizationContent;
