import React, { useState } from "react";
import { motion } from "framer-motion";

interface QuizOption {
    label: string;
    value: string;
}

interface QuizQuestion {
    id: string;
    text: string;
    options: QuizOption[];
    correctAnswer: string;
}

interface Questions {
    [key: string]: QuizQuestion[];
}

interface PostTestProps {
    isDarkMode?: boolean;
}

const PostTestContent: React.FC<PostTestProps> = ({ isDarkMode = false }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showingFeedback, setShowingFeedback] = useState(false);

    // Quiz questions organized by difficulty level
    const questions: Questions = {
        beginner: [
            {
                id: "b1",
                text: "What is the time complexity of Bubble Sort in the worst case?",
                options: [
                    { label: "O(n)", value: "a" },
                    { label: "O(n log n)", value: "b" },
                    { label: "O(n²)", value: "c" },
                    { label: "O(1)", value: "d" },
                ],
                correctAnswer: "c",
            },
            {
                id: "b2",
                text: "Which of the following is true about Bubble Sort?",
                options: [
                    { label: "It's the fastest sorting algorithm", value: "a" },
                    { label: "It always requires exactly n iterations", value: "b" },
                    { label: "It's a stable sorting algorithm", value: "c" },
                    { label: "It requires additional memory proportional to input size", value: "d" },
                ],
                correctAnswer: "c",
            },
            {
                id: "b3",
                text: "How many iterations of the outer loop are needed by the algorithm when the input array of size N is already sorted?",
                options: [
                    { label: "0", value: "a" },
                    { label: "1", value: "b" },
                    { label: "N", value: "c" },
                    { label: "2N", value: "d" },
                ],
                correctAnswer: "b",
            },
            {
                id: "b4",
                text: "How do we check if our array is sorted in order to preemptively stop the optimized algorithm?",
                options: [
                    { label: "Run an extra iteration as part of the current iteration and check that all adjacent elements are in the right order.", value: "a" },
                    { label: "Check if any swaps occurred in the current iteration.", value: "b" },
                    { label: "There is no way to preemptively stop the algorithm, i.e, a minimum of N - 1 iterations is required where N is the array size.", value: "c" },
                    { label: "None of the above", value: "d" },
                ],
                correctAnswer: "b",
            }
        ],
        intermediate: [
            {
                id: "i1",
                text: "How many comparisons (same as the number of iterations of the inner loop) are required in the next iteration after T iterations of the outer loop in the optimized algorithm? The array size is N.",
                options: [
                    { label: "N", value: "a" },
                    { label: "N - 1", value: "b" },
                    { label: "N - T", value: "c" },
                    { label: "N - T + 1", value: "d" },
                ],
                correctAnswer: "c",
            },
            {
                id: "i2",
                text: "What will be the time complexity of the regular unoptimized bubble sort algorithm in the best case, i.e, when the input array is already sorted?",
                options: [
                    { label: "O(n)", value: "a" },
                    { label: "O(n²)", value: "b" },
                    { label: "O(n log n)", value: "c" },
                    { label: "O(1)", value: "d" },
                ],
                correctAnswer: "b",
            },
            {
                id: "i3",
                text: "How many iterations of the outer and inner loops will it take to sort the following array using the optimized algorithm?\nA = [-4, -9, -1, 8, -9, 4]",
                options: [
                    { label: "Outer = 4, Inner = 14", value: "a" },
                    { label: "Outer = 3, Inner = 12", value: "b" },
                    { label: "Outer = 5, Inner = 25", value: "c" },
                    { label: "Outer = 4, Inner = 20", value: "d" },
                ],
                correctAnswer: "b",
            },
            {
                id: "i4",
                text: "Consider the following array:\nA = [8, 7, -2, 4, 1]\nHow many swaps occur in the 1st iteration of the outer loop?",
                options: [
                    { label: "0", value: "a" },
                    { label: "1", value: "b" },
                    { label: "3", value: "c" },
                    { label: "4", value: "d" },
                ],
                correctAnswer: "c",
            }
        ],
        advanced: [
            {
                id: "a1",
                text: "Which optimization technique can improve the best-case time complexity of Bubble Sort to O(n)?",
                options: [
                    { label: "Using binary search", value: "a" },
                    { label: "Using a flag to detect if any swaps were made", value: "b" },
                    { label: "Sorting in descending order", value: "c" },
                    { label: "None of the above", value: "d" },
                ],
                correctAnswer: "b",
            },
            {
                id: "a2",
                text: "Consider the following array:\nA = [-10, 100, 1, 0, 9, 1*]\nNote that the '*' is used to mark a distinction between the two 1's in order to keep track of their order while sorting. What will be the final output of the algorithm for this array (assume ascending order sort)?",
                options: [
                    { label: "[-10, 0, 1, 1*, 9, 100]", value: "a" },
                    { label: "[-10, 0, 1*, 1, 9, 100]", value: "b" },
                    { label: "[100, 9, 1, 1*, 0, -10]", value: "c" },
                    { label: "[100, 9, 1*, 1, 0, -10]", value: "d" },
                ],
                correctAnswer: "a",
            },
            {
                id: "a3",
                text: "What will be the space complexity of the bubble sort algorithm?",
                options: [
                    { label: "O(n)", value: "a" },
                    { label: "O(2^n)", value: "b" },
                    { label: "O(1)", value: "c" },
                    { label: "O(n²)", value: "d" },
                ],
                correctAnswer: "c",
            },
            {
                id: "a4",
                text: "Consider the following array:\nA = [8, 7, -2, 4, 1]\nWhich of the following will represent the array after the 3rd iteration of the algorithm (assume ascending order sort)?",
                options: [
                    { label: "[7, -2, 4, 1, 8]", value: "a" },
                    { label: "[-2, 4, 1, 7, 8]", value: "b" },
                    { label: "[-2, 1, 4, 7, 8]", value: "c" },
                    { label: "[8, 7, 4, 1, -2]", value: "d" },
                ],
                correctAnswer: "c",
            },
            {
                id: "a5",
                text: "Which of the following statements about Bubble Sort is FALSE?",
                options: [
                    { label: "It can be optimized to detect if the array is already sorted", value: "a" },
                    { label: "It is a comparison-based sorting algorithm", value: "b" },
                    { label: "It is an in-place sorting algorithm", value: "c" },
                    { label: "It has a best-case time complexity of O(log n)", value: "d" },
                ],
                correctAnswer: "d",
            }
        ],
    };

    // Start the quiz with the selected difficulty
    const handleStartQuiz = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        setQuizStarted(true);
        setSubmitted(false);
        setAnswers({});
        setScore(0);
        setShowingFeedback(false);
    };

    // Update answers as user selects options
    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    // Submit the quiz and calculate score
    const handleSubmit = () => {
        const currentQuestions = questions[selectedDifficulty];
        let correctAnswers = 0;

        currentQuestions.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                correctAnswers++;
            }
        });

        setScore(correctAnswers);
        setSubmitted(true);
        setShowingFeedback(true);
    };

    // Reset the quiz to choose another difficulty
    const resetQuiz = () => {
        setQuizStarted(false);
        setSelectedDifficulty("");
        setSubmitted(false);
        setAnswers({});
        setScore(0);
        setShowingFeedback(false);
    };

    // Calculate the percentage score
    const scorePercentage = submitted
        ? (score / questions[selectedDifficulty].length) * 100
        : 0;

    // Get appropriate feedback based on score
    const getFeedback = () => {
        if (scorePercentage === 100) {
            return {
                title: "Perfect Score!",
                message: "Excellent work! You've mastered Bubble Sort concepts!",
                icon: (
                    <svg
                        className="w-12 h-12 text-green-500"
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
                ),
            };
        } else if (scorePercentage >= 70) {
            return {
                title: "Great Job!",
                message:
                    "You have a good understanding of Bubble Sort. Keep practicing!",
                icon: (
                    <svg
                        className="w-12 h-12 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                ),
            };
        } else {
            return {
                title: "Keep Learning",
                message: "You might want to review the Bubble Sort algorithm again.",
                icon: (
                    <svg
                        className="w-12 h-12 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                    </svg>
                ),
            };
        }
    };

    // Get difficulty color scheme
    const getDifficultyColors = (difficulty: string) => {
        switch (difficulty) {
            case "beginner":
                return {
                    bg: isDarkMode ? "bg-green-900/20" : "bg-green-50",
                    border: isDarkMode ? "border-green-700" : "border-green-200",
                    text: isDarkMode ? "text-green-400" : "text-green-700",
                    badge: isDarkMode ? "bg-green-700" : "bg-green-600",
                };
            case "intermediate":
                return {
                    bg: isDarkMode ? "bg-yellow-900/20" : "bg-yellow-50",
                    border: isDarkMode ? "border-yellow-700" : "border-yellow-200",
                    text: isDarkMode ? "text-yellow-400" : "text-yellow-700",
                    badge: isDarkMode ? "bg-yellow-700" : "bg-yellow-600",
                };
            case "advanced":
                return {
                    bg: isDarkMode ? "bg-red-900/20" : "bg-red-50",
                    border: isDarkMode ? "border-red-700" : "border-red-200",
                    text: isDarkMode ? "text-red-400" : "text-red-700",
                    badge: isDarkMode ? "bg-red-700" : "bg-red-600",
                };
            default:
                return {
                    bg: isDarkMode ? "bg-gray-800" : "bg-gray-50",
                    border: isDarkMode ? "border-gray-700" : "border-gray-200",
                    text: isDarkMode ? "text-gray-300" : "text-gray-700",
                    badge: isDarkMode ? "bg-gray-700" : "bg-gray-600",
                };
        }
    };

    // If quiz hasn't started, show difficulty selection
    if (!quizStarted) {
        return (
            <div className="space-y-8">
                {/* Header */}
                <div
                    className={`relative overflow-hidden rounded-xl ${isDarkMode
                        ? "bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900"
                        : "bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-600"
                        } p-8 text-white shadow-lg`}
                >
                    <div className="absolute -right-10 -bottom-10 opacity-10">
                        <svg
                            width="200"
                            height="200"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold mb-4">Post Test</h2>
                    <p className="max-w-3xl text-lg">
                        Test your knowledge of Bubble Sort with this interactive quiz.
                        Choose a difficulty level that matches your confidence level.
                    </p>
                </div>

                {/* Difficulty Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["beginner", "intermediate", "advanced"].map((difficulty) => {
                        const difficultyTitle =
                            difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
                        const colors = getDifficultyColors(difficulty);

                        return (
                            <motion.div
                                key={difficulty}
                                whileHover={{ y: -5 }}
                                className={`border rounded-xl p-6 shadow-sm cursor-pointer transition-all ${colors.bg} ${colors.border} hover:shadow-md`}
                                onClick={() => handleStartQuiz(difficulty)}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`text-xl font-semibold ${colors.text}`}>
                                        {difficultyTitle}
                                    </h3>
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full text-white ${colors.badge}`}
                                    >
                                        {questions[difficulty].length} Questions
                                    </span>
                                </div>

                                <p
                                    className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                        } mb-4`}
                                >
                                    {difficulty === "beginner"
                                        ? "Basic concepts of Bubble Sort algorithm."
                                        : difficulty === "intermediate"
                                            ? "Detailed understanding of algorithm execution."
                                            : "Advanced optimization and analysis."}
                                </p>

                                <div className="flex justify-end">
                                    <button
                                        className={`flex items-center px-4 py-2 rounded-md text-white transition-colors ${colors.badge} hover:opacity-90`}
                                        onClick={() => handleStartQuiz(difficulty)}
                                    >
                                        Start Quiz
                                        <svg
                                            className="ml-2 w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Quiz has started, show questions
    const currentQuestions = questions[selectedDifficulty];
    const colors = getDifficultyColors(selectedDifficulty);
    const feedback = getFeedback();

    return (
        <div className="space-y-8">
            {/* Quiz Header */}
            <div
                className={`flex flex-wrap items-center justify-between p-5 rounded-lg ${colors.bg} ${colors.border}`}
            >
                <div>
                    <h3 className={`text-xl font-semibold ${colors.text}`}>
                        Bubble Sort Quiz -{" "}
                        {selectedDifficulty.charAt(0).toUpperCase() +
                            selectedDifficulty.slice(1)}
                    </h3>
                    <p
                        className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        {currentQuestions.length} questions to test your knowledge
                    </p>
                </div>

                <button
                    onClick={resetQuiz}
                    className={`flex items-center px-3 py-1.5 rounded-md text-sm ${isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
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
                            strokeWidth="2"
                            d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                    </svg>
                    Change Difficulty
                </button>
            </div>

            {/* Score Summary (if submitted) */}
            {showingFeedback && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-lg border ${scorePercentage === 100
                        ? isDarkMode
                            ? "bg-green-900/20 border-green-700"
                            : "bg-green-50 border-green-200"
                        : scorePercentage >= 70
                            ? isDarkMode
                                ? "bg-blue-900/20 border-blue-700"
                                : "bg-blue-50 border-blue-200"
                            : isDarkMode
                                ? "bg-yellow-900/20 border-yellow-700"
                                : "bg-yellow-50 border-yellow-200"
                        }`}
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                        <div className="mb-4 sm:mb-0 sm:mr-6">{feedback.icon}</div>
                        <div className="text-center sm:text-left">
                            <h4
                                className={`text-xl font-bold mb-2 ${scorePercentage === 100
                                    ? isDarkMode
                                        ? "text-green-400"
                                        : "text-green-700"
                                    : scorePercentage >= 70
                                        ? isDarkMode
                                            ? "text-blue-400"
                                            : "text-blue-700"
                                        : isDarkMode
                                            ? "text-yellow-400"
                                            : "text-yellow-700"
                                    }`}
                            >
                                {feedback.title}
                            </h4>

                            <p
                                className={`mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                {feedback.message}
                            </p>

                            <div className="flex items-center">
                                <div
                                    className={`text-2xl font-bold ${scorePercentage >= 70
                                        ? isDarkMode
                                            ? "text-green-400"
                                            : "text-green-700"
                                        : isDarkMode
                                            ? "text-yellow-400"
                                            : "text-yellow-700"
                                        }`}
                                >
                                    {score} / {currentQuestions.length}
                                </div>
                                <div className="ml-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full ${scorePercentage === 100
                                            ? "bg-green-600"
                                            : scorePercentage >= 70
                                                ? "bg-blue-600"
                                                : "bg-yellow-600"
                                            }`}
                                        style={{ width: `${scorePercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                onClick={resetQuiz}
                                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                            >
                                Try Another Quiz
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Questions */}
            <div className="space-y-8">
                {currentQuestions.map((question, index) => (
                    <div
                        key={question.id}
                        className={`p-6 border rounded-lg shadow-sm ${submitted && answers[question.id] === question.correctAnswer
                            ? isDarkMode
                                ? "bg-green-900/20 border-green-700"
                                : "bg-green-50 border-green-200"
                            : submitted && answers[question.id] !== undefined
                                ? isDarkMode
                                    ? "bg-red-900/20 border-red-700"
                                    : "bg-red-50 border-red-200"
                                : isDarkMode
                                    ? "bg-gray-800 border-gray-700"
                                    : "bg-white border-gray-200"
                            } transition-all`}
                    >
                        {/* Question Number Badge */}
                        <div className="flex items-center mb-4">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${submitted && answers[question.id] === question.correctAnswer
                                    ? "bg-green-600 text-white"
                                    : submitted && answers[question.id] !== undefined
                                        ? "bg-red-600 text-white"
                                        : isDarkMode
                                            ? "bg-gray-700 text-gray-300"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <h4
                                className={`font-medium whitespace-pre-line ${isDarkMode ? "text-gray-100" : "text-gray-800"
                                    }`}
                            >
                                {question.text}
                            </h4>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mt-5">
                            {question.options.map((option) => {
                                const isSelected = answers[question.id] === option.value;
                                const isCorrect = question.correctAnswer === option.value;

                                // Only apply special styling when submitted
                                let optionClass = "";
                                if (submitted) {
                                    if (isCorrect) {
                                        // Correct answer styling
                                        optionClass = isDarkMode
                                            ? "border-green-700 bg-green-900/30 text-green-400"
                                            : "border-green-600 bg-green-50 text-green-800";
                                    } else if (isSelected) {
                                        // Selected but incorrect answer styling
                                        optionClass = isDarkMode
                                            ? "border-red-700 bg-red-900/30 text-red-400"
                                            : "border-red-600 bg-red-50 text-red-800";
                                    } else {
                                        // Not selected answer styling
                                        optionClass = isDarkMode
                                            ? "border-gray-700 bg-gray-800 text-gray-400"
                                            : "border-gray-200 bg-gray-50 text-gray-500";
                                    }
                                } else {
                                    // Not submitted yet - only differentiate selected option
                                    optionClass = isSelected
                                        ? isDarkMode
                                            ? "border-indigo-500 bg-indigo-900/30 text-indigo-300"
                                            : "border-indigo-600 bg-indigo-50 text-indigo-700"
                                        : isDarkMode
                                            ? "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
                                            : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700";
                                }

                                return (
                                    <div
                                        key={option.value}
                                        className={`border rounded-lg p-3 transition-all ${optionClass} ${!submitted && "cursor-pointer"
                                            }`}
                                        onClick={() => {
                                            if (!submitted) {
                                                handleAnswerChange(question.id, option.value);
                                            }
                                        }}
                                    >
                                        <div className="flex items-center">
                                            {/* Circle indicator with letter or icon */}
                                            <div
                                                className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 border ${
                                                    // Different styling based on quiz state
                                                    isSelected
                                                        ? isDarkMode
                                                            ? "border-indigo-500 bg-indigo-600"
                                                            : "border-indigo-600 bg-indigo-600"
                                                        : isDarkMode
                                                            ? "border-gray-600"
                                                            : "border-gray-400"
                                                    }
                        ${
                                                    // Show check/x marks only after submission
                                                    submitted
                                                        ? isSelected || isCorrect
                                                            ? "text-white"
                                                            : "text-transparent"
                                                        : isSelected
                                                            ? "text-white"
                                                            : "text-transparent"
                                                    }`}
                                            >
                                                {submitted && isCorrect ? (
                                                    // Show checkmark for correct answer after submission
                                                    <svg
                                                        className="w-4 h-4"
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
                                                ) : submitted && isSelected && !isCorrect ? (
                                                    // Show X mark for incorrect selected answer after submission
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                ) : (
                                                    // Otherwise show just the option letter
                                                    option.value.toUpperCase()
                                                )}
                                            </div>
                                            <span>{option.label}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Explanation (shown after submitting) */}
                        {submitted && (
                            <div
                                className={`mt-4 p-3 rounded-md ${answers[question.id] === question.correctAnswer
                                    ? isDarkMode
                                        ? "bg-green-900/20 text-green-400"
                                        : "bg-green-50 text-green-800"
                                    : isDarkMode
                                        ? "bg-amber-900/20 text-amber-400"
                                        : "bg-amber-50 text-amber-800"
                                    }`}
                            >
                                <div className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
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
                                    {answers[question.id] === question.correctAnswer
                                        ? "Correct! Well done."
                                        : `Incorrect. The correct answer is option ${question.correctAnswer.toUpperCase()}: ${question.options.find(
                                            (o) => o.value === question.correctAnswer
                                        )?.label
                                        }`}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Submit Button (only shown if not yet submitted) */}
            {!submitted && (
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length !== currentQuestions.length}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${Object.keys(answers).length === currentQuestions.length
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : isDarkMode
                                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                                : "bg-gray-200 cursor-not-allowed text-gray-500"
                            }`}
                    >
                        Submit Quiz
                    </button>
                </div>
            )}

            {/* Progress Indicator */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {Object.keys(answers).length} of {currentQuestions.length} questions
                    answered
                </div>

                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{
                            width: `${(Object.keys(answers).length / currentQuestions.length) * 100
                                }%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default PostTestContent;
