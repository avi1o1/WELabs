import React, { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface PretestProps {
  isDarkMode?: boolean;
}

const PretestContent: React.FC<PretestProps> = ({ isDarkMode = false }) => {
  // Beginner-level questions
  const beginnerQuestions: Question[] = [
    {
      question: "1. Which of the following is an array?",
      options: [
        "[1, 4, 3, 10]",
        "['A', 3, 0, 'Hello world']",
        '["Test", False, \'x\', "hi"]',
        "[True, False, 6, 2.5]",
      ],
      correct: 0,
    },
    {
      question:
        "2. Which of the following is an array sorted in ascending order?",
      options: [
        "1, 4, 5, -10",
        "-10, -13, 15, 100",
        "-1000, 0, 14, 27",
        "100, 50, 10, 0",
      ],
      correct: 2,
    },
    {
      question: "3. Which of the following is not a sorting algorithm?",
      options: ["Bubble", "Selection", "Merge", "Binary"],
      correct: 3,
    },
    {
      question: "4. A = [-1, 9, 4, 8]. Identify A[2] (0-indexed).",
      options: ["-1", "9", "4", "8"],
      correct: 2,
    },
    {
      question:
        "5. Consider the following pseudo-code:\n" +
        "for i = 0 to 2\n" +
        "\tfor j = 0 to i\n" +
        '\t\tprint "*"\n' +
        "\tprint newline\n" +
        "end\n\nPredict the output:",
      options: ["*\n**\n***", "*\n*\n*", "***\n**\n*", "******"],
      correct: 0,
    },
  ];

  // Advanced-level questions
  const advancedQuestions: Question[] = [
    {
      question: "1. Bubble Sort's worst-case time complexity is:",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(1)"],
      correct: 1,
    },
    {
      question: "2. Which statement about Bubble Sort is correct?",
      options: [
        "It is not stable",
        "It is stable",
        "It requires extra space of O(n)",
        "It always beats Quick Sort",
      ],
      correct: 1,
    },
    {
      question:
        "3. In which scenario does Bubble Sort achieve its best-case complexity?",
      options: [
        "When the array is empty",
        "When the array is reverse-sorted",
        "When the array is already sorted",
        "It always takes the same time",
      ],
      correct: 2,
    },
    {
      question:
        "4. Which of the following sorting algorithms can perform better than Bubble Sort on average?",
      options: [
        "Insertion Sort",
        "Selection Sort",
        "Quick Sort",
        "All of the above",
      ],
      correct: 3,
    },
    {
      question:
        "5. How many passes does Bubble Sort need in the worst case to sort an array of size N?",
      options: [
        "N/2 passes",
        "N-1 passes",
        "log(N) passes",
        "1 pass if it's nearly sorted",
      ],
      correct: 1,
    },
  ];

  const [difficulty, setDifficulty] = useState<string>("beginner");
  const [score, setScore] = useState<number | null>(null);
  const [beginnerAnswers, setBeginnerAnswers] = useState<(number | null)[]>(
    Array(beginnerQuestions.length).fill(null)
  );
  const [advancedAnswers, setAdvancedAnswers] = useState<(number | null)[]>(
    Array(advancedQuestions.length).fill(null)
  );

  // Decide which question set to use based on difficulty
  const questions =
    difficulty === "beginner" ? beginnerQuestions : advancedQuestions;

  // Decide which selectedAnswers array to use
  const selectedAnswers =
    difficulty === "beginner" ? beginnerAnswers : advancedAnswers;

  // Handler for selecting an answer (radio button)
  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (difficulty === "beginner") {
      const updated = [...beginnerAnswers];
      updated[questionIndex] = optionIndex;
      setBeginnerAnswers(updated);
    } else {
      const updated = [...advancedAnswers];
      updated[questionIndex] = optionIndex;
      setAdvancedAnswers(updated);
    }
    setScore(null); // reset score if user changes answers
  };

  // Handler for "Submit" button
  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  // Calculate completion percentage for progress bar
  const completionPercentage = Math.round(
    (selectedAnswers.filter((answer) => answer !== null).length /
      questions.length) *
      100
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode
            ? "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900"
            : "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"
        } p-8 text-white shadow-lg`}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold mb-4">Warm Up</h2>
        <p className="max-w-3xl text-lg">
          Test your initial knowledge about sorting algorithms and array
          operations. This will help establish your baseline understanding
          before diving into the lesson.
        </p>
      </div>

      {/* Difficulty Selection */}
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
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold ml-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Choose Difficulty Level
          </h3>
        </div>

        <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Select a difficulty level that matches your current knowledge about
          sorting algorithms.
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => {
              setDifficulty("beginner");
              setScore(null); // reset score when switching
            }}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center cursor-pointer ${
              difficulty === "beginner"
                ? isDarkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-blue-300 hover:bg-gray-600"
                : "bg-gray-100 text-blue-600 hover:bg-gray-200"
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
                d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            Beginner
          </button>
          
          <button
            onClick={() => {
              setDifficulty("advanced");
              setScore(null);
            }}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center cursor-pointer ${
              difficulty === "advanced"
                ? isDarkMode
                  ? "bg-purple-600 text-white"
                  : "bg-purple-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-purple-300 hover:bg-gray-600"
                : "bg-gray-100 text-purple-600 hover:bg-gray-200"
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Advanced
          </button>
        </div>
      </div>

      {/* Questions */}
      <motion.div
        key={difficulty}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl shadow-md border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3
              className={`text-xl font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {difficulty === "beginner" ? "Beginner" : "Advanced"} Level Quiz
            </h3>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                difficulty === "beginner"
                  ? isDarkMode
                    ? "bg-blue-900/40 text-blue-300"
                    : "bg-blue-100 text-blue-700"
                  : isDarkMode
                  ? "bg-purple-900/40 text-purple-300"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {questions.length} Questions
            </span>
          </div>

          <div className="space-y-8 mb-8">
            {questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className={`p-5 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`font-medium mb-4 whitespace-pre-line ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={`flex items-center p-3 rounded-lg transition-all cursor-pointer ${
                        selectedAnswers[qIdx] === oIdx
                          ? isDarkMode
                            ? "bg-indigo-900/30 border border-indigo-700"
                            : "bg-indigo-50 border border-indigo-200"
                          : isDarkMode
                          ? "hover:bg-gray-700 border border-gray-700"
                          : "hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                          selectedAnswers[qIdx] === oIdx
                            ? isDarkMode
                              ? "border-indigo-500 bg-indigo-500"
                              : "border-indigo-600 bg-indigo-600"
                            : isDarkMode
                            ? "border-gray-600"
                            : "border-gray-400"
                        } flex items-center justify-center`}
                      >
                        {selectedAnswers[qIdx] === oIdx && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>

                      <div className="ml-3 flex items-center">
                        <span
                          className={`font-medium mr-2 ${
                            selectedAnswers[qIdx] === oIdx
                              ? isDarkMode
                                ? "text-indigo-400"
                                : "text-indigo-700"
                              : isDarkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {String.fromCharCode(97 + oIdx)}.
                        </span>
                        <span
                          className={`${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {opt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Questions answered
              </div>
              <div
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {selectedAnswers.filter((a) => a !== null).length} of{" "}
                {questions.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  difficulty === "beginner" ? "bg-blue-600" : "bg-purple-600"
                }`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers.some((a) => a === null)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                selectedAnswers.some((a) => a === null)
                  ? isDarkMode
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Submit Answers
            </button>
          </div>
        </div>
      </motion.div>

      {/* Score Result */}
      {score !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl shadow-md p-6 border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center mb-4">
            <div
              className={`p-2 rounded-lg ${
                score / questions.length >= 0.7
                  ? isDarkMode
                    ? "bg-green-900/40"
                    : "bg-green-100"
                  : isDarkMode
                  ? "bg-amber-900/40"
                  : "bg-amber-100"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  score / questions.length >= 0.7
                    ? isDarkMode
                      ? "text-green-400"
                      : "text-green-600"
                    : isDarkMode
                    ? "text-amber-400"
                    : "text-amber-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {score / questions.length >= 0.7 ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                )}
              </svg>
            </div>
            <h3
              className={`text-xl font-semibold ml-3 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Your Score
            </h3>
          </div>

          <div
            className={`flex flex-col md:flex-row items-center justify-between p-5 rounded-lg bg-opacity-50 mb-4 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center mb-4 md:mb-0">
              <div
                className={`text-5xl font-bold ${
                  score / questions.length >= 0.7
                    ? isDarkMode
                      ? "text-green-400"
                      : "text-green-600"
                    : isDarkMode
                    ? "text-amber-400"
                    : "text-amber-600"
                }`}
              >
                {score}
              </div>
              <div className="ml-3">
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  out of
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {questions.length}
                </div>
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="h-3 rounded-full bg-gray-300 dark:bg-gray-600">
                <div
                  className={`h-3 rounded-full ${
                    score / questions.length >= 0.7
                      ? "bg-green-500"
                      : "bg-amber-500"
                  }`}
                  style={{ width: `${(score / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center text-sm">
                {score / questions.length >= 0.7 ? (
                  <span
                    className={`${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    Great job! You're ready for the lesson.
                  </span>
                ) : (
                  <span
                    className={`${
                      isDarkMode ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    Don't worry - this lesson will help you improve!
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            <p className="mb-4">
              This pretest helps us understand your current knowledge level. The
              course content will explain all these concepts in detail, so don't
              worry if you didn't score perfectly.
            </p>
            <p>
              Feel free to proceed with the lesson or try the{" "}
              {difficulty === "beginner" ? "advanced" : "beginner"} difficulty
              level.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => {
                setDifficulty(
                  difficulty === "beginner" ? "advanced" : "beginner"
                );
                setScore(null);
              }}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Try {difficulty === "beginner" ? "Advanced" : "Beginner"} Quiz
            </button>

            <button
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Continue to Lesson
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PretestContent;
