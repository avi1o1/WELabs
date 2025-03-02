"use client";
import React, { useState } from 'react';
import PageContent from '@/components/PageContent';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function PretestPage() {
  const questions: Question[] = [
    {
      text: "What is a sorting algorithm?",
      options: [
        "An algorithm that arranges elements in a specific order",
        "An algorithm that searches for elements in a data structure",
        "An algorithm that creates data structures",
        "An algorithm that deletes elements from a data structure"
      ],
      correctAnswer: 0
    },
    {
      text: "Which of the following best describes an in-place sorting algorithm?",
      options: [
        "An algorithm that sorts data using only recursive calls",
        "An algorithm that sorts data without extra space beyond a constant amount",
        "An algorithm that sorts data without modifying the original array",
        "An algorithm that sorts data in linear time"
      ],
      correctAnswer: 1
    },
    {
      text: "What does the term 'stable sorting' mean?",
      options: [
        "The algorithm never crashes",
        "The algorithm runs in the same time regardless of input",
        "The algorithm preserves the relative order of equal elements",
        "The algorithm requires constant memory space"
      ],
      correctAnswer: 2
    },
    {
      text: "What is the primary operation used in bubble sort?",
      options: [
        "Division",
        "Swapping",
        "Merging",
        "Partitioning"
      ],
      correctAnswer: 1
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
      title="Pretest" 
      subtitle="Test your knowledge before starting the experiment"
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
                Score: {score}/{questions.length}
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