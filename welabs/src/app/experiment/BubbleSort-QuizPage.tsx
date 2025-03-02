"use client";
import React, { useState } from 'react';
import PageContent from '@/components/PageContent';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function BubbleSortQuizPage() {
  const questions: Question[] = [
    {
      text: "What is the worst-case time complexity of Bubble Sort?",
      options: [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(n³)"
      ],
      correctAnswer: 2
    },
    {
      text: "How many passes does Bubble Sort need to completely sort an array of n elements in the worst case?",
      options: [
        "n",
        "n - 1",
        "n log n",
        "n²"
      ],
      correctAnswer: 1
    },
    {
      text: "Which element is guaranteed to be in its correct position after the first pass of Bubble Sort?",
      options: [
        "The smallest element",
        "The largest element",
        "The middle element",
        "No element is guaranteed to be in its correct position"
      ],
      correctAnswer: 1
    },
    {
      text: "Is Bubble Sort a stable sorting algorithm?",
      options: [
        "Yes, it preserves the relative order of equal elements",
        "No, it may change the relative order of equal elements",
        "It depends on the implementation",
        "Stability is not applicable to comparison sorts"
      ],
      correctAnswer: 0
    },
    {
      text: "What is the space complexity of Bubble Sort?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      correctAnswer: 0
    }
  ];

  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
    setScore(0);
  };

  return (
    <PageContent 
      title="Bubble Sort - Quiz" 
      subtitle="Test your knowledge of the Bubble Sort algorithm"
    >
      <div className="space-y-6">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-3">{qIndex + 1}. {question.text}</p>
            <div className="space-y-2 ml-4">
              {question.options.map((option, oIndex) => (
                <div 
                  key={oIndex} 
                  className={`
                    p-2 rounded-md cursor-pointer flex items-center
                    ${answers[qIndex] === oIndex ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-100'}
                    ${submitted && oIndex === question.correctAnswer ? 'bg-green-100 border border-green-300' : ''}
                    ${submitted && answers[qIndex] === oIndex && oIndex !== question.correctAnswer ? 'bg-red-100 border border-red-300' : ''}
                  `}
                  onClick={() => handleAnswer(qIndex, oIndex)}
                >
                  <div className={`w-5 h-5 rounded-full border mr-2 flex items-center justify-center
                    ${answers[qIndex] === oIndex ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}
                  `}>
                    {answers[qIndex] === oIndex && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
            {submitted && (
              <div className="mt-3 text-sm">
                <p className={answers[qIndex] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                  {answers[qIndex] === question.correctAnswer 
                    ? "✓ Correct!" 
                    : `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`}
                </p>
              </div>
            )}
          </div>
        ))}

        <div className="mt-6 flex space-x-4">
          {!submitted ? (
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              disabled={answers.includes(-1)}
            >
              Submit
            </button>
          ) : (
            <>
              <div className="px-4 py-2 bg-gray-100 rounded-md">
                Score: {score}/{questions.length} ({Math.round((score/questions.length)*100)}%)
              </div>
              <button 
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              >
                Retake Quiz
              </button>
            </>
          )}
        </div>
      </div>
    </PageContent>
  );
}