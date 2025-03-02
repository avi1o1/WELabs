"use client";
import React, { useState } from 'react';
import PageContent from '@/components/PageContent';

export default function BubbleSortPracticePage() {
  const [originalArray, setOriginalArray] = useState([5, 3, 8, 4, 2]);
  const [userArray, setUserArray] = useState([...originalArray]);
  const [correctArray, setCorrectArray] = useState<number[]>([]);
  const [swaps, setSwaps] = useState<[number, number][]>([]);
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Generate a new random array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
    setOriginalArray(newArray);
    setUserArray([...newArray]);
    setCorrectArray([]);
    setSwaps([]);
    setMessage('');
    setIsCorrect(false);
  };

  // Swap two elements in the user array
  const swapElements = (i: number, j: number) => {
    if (isCorrect) return;
    
    const newArray = [...userArray];
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    setUserArray(newArray);
    setSwaps([...swaps, [i, j]]);
  };

  // Check if the user's solution is correct
  const checkSolution = () => {
    const sortedArray = [...originalArray].sort((a, b) => a - b);
    const isArraySorted = JSON.stringify(userArray) === JSON.stringify(sortedArray);
    
    if (isArraySorted) {
      setMessage('Correct! Your array is sorted.');
      setIsCorrect(true);
      setCorrectArray(sortedArray);
    } else {
      setMessage('Not quite. Your array is not correctly sorted. Try again.');
    }
  };

  // Reset the practice
  const resetPractice = () => {
    setUserArray([...originalArray]);
    setSwaps([]);
    setMessage('');
    setIsCorrect(false);
  };

  // Show the correct solution
  const showSolution = () => {
    const sortedArray = [...originalArray].sort((a, b) => a - b);
    setCorrectArray(sortedArray);
  };

  return (
    <PageContent 
      title="Bubble Sort - Practice" 
      subtitle="Practice implementing the Bubble Sort algorithm"
    >
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-medium mb-2">Instructions:</h3>
          <p>
            Sort the array below by clicking on adjacent elements to swap them. Try to implement the bubble sort algorithm by comparing and swapping adjacent elements until the array is sorted.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-end space-x-4">
            {userArray.map((value, index) => (
              <div 
                key={index}
                className="relative"
              >
                <div 
                  className="w-12 h-12 bg-blue-500 flex items-center justify-center text-white font-bold rounded-md cursor-pointer hover:bg-blue-600 transition"
                  onClick={() => {
                    // Allow swapping only with adjacent elements
                    if (index < userArray.length - 1) {
                      swapElements(index, index + 1);
                    }
                  }}
                >
                  {value}
                </div>
                {index < userArray.length - 1 && (
                  <button 
                    className="absolute -right-6 top-3 w-8 h-6 bg-gray-300 text-xs rounded hover:bg-gray-400"
                    onClick={() => swapElements(index, index + 1)}
                  >
                    ↔
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {correctArray.length > 0 && (
          <div className="flex justify-center mb-8">
            <div>
              <p className="text-center mb-2 font-medium">Correct Solution:</p>
              <div className="flex space-x-4">
                {correctArray.map((value, index) => (
                  <div 
                    key={index}
                    className="w-12 h-12 bg-green-500 flex items-center justify-center text-white font-bold rounded-md"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex space-x-4 justify-center">
          <button 
            onClick={generateRandomArray}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            New Array
          </button>
          
          <button 
            onClick={checkSolution}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Check Solution
          </button>
          
          <button 
            onClick={resetPractice}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
          >
            Reset
          </button>
          
          <button 
            onClick={showSolution}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Show Solution
          </button>
        </div>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        
        {swaps.length > 0 && (
          <div className="mt-8">
            <h3 className="font-medium mb-2">Your Swaps:</h3>
            <div className="bg-gray-100 p-4 rounded-md max-h-40 overflow-y-auto">
              <ol className="list-decimal list-inside">
                {swaps.map((swap, index) => (
                  <li key={index}>
                    Swapped positions {swap[0]} and {swap[1]}: values {originalArray[swap[0]]} and {originalArray[swap[1]]}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </PageContent>
  );
}