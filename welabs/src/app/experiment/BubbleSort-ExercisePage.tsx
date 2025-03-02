"use client";
import React, { useState } from 'react';
import PageContent from '@/components/PageContent';

export default function BubbleSortExercisePage() {
  const [code, setCode] = useState(
`function bubbleSort(arr) {
  // Write your bubble sort implementation here
  
  return arr;
}`);
  
  const [testArray, setTestArray] = useState([5, 3, 8, 4, 2, 7, 1, 6]);
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  // Test the user's bubble sort implementation
  const testCode = () => {
    try {
      // Create a sandbox function to execute the user's code
      const userFunction = new Function('arr', `
        ${code}
        return bubbleSort([...arr]);
      `);
      
      // Clone the test array to avoid modifying the original
      const inputArray = [...testArray];
      const userSortedArray = userFunction(inputArray);
      
      // Sort the original array to compare
      const correctSortedArray = [...testArray].sort((a, b) => a - b);
      
      // Check if the user's solution is correct
      const isArrayCorrect = JSON.stringify(userSortedArray) === JSON.stringify(correctSortedArray);
      
      if (isArrayCorrect) {
        setOutput(`Success! Your bubble sort implementation works correctly.\n\nInput: [${testArray.join(', ')}]\nOutput: [${userSortedArray.join(', ')}]`);
        setIsCorrect(true);
      } else {
        setOutput(`Your implementation does not produce the correct result.\n\nInput: [${testArray.join(', ')}]\nYour Output: [${userSortedArray ? userSortedArray.join(', ') : 'undefined'}]\nExpected: [${correctSortedArray.join(', ')}]`);
        setIsCorrect(false);
      }
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
      setIsCorrect(false);
    }
  };

  // Reset the exercise
  const resetExercise = () => {
    setCode(
`function bubbleSort(arr) {
  // Write your bubble sort implementation here
  
  return arr;
}`);
    setOutput('');
    setIsCorrect(false);
  };

  // Show solution
  const showSolution = () => {
    setCode(
`function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`);
  };

  // Generate a new random test array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setTestArray(newArray);
    setOutput('');
    setIsCorrect(false);
  };

  return (
    <PageContent 
      title="Bubble Sort - Exercise" 
      subtitle="Implement the Bubble Sort algorithm"
    >
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-medium mb-2">Instructions:</h3>
          <p>
            Complete the bubble sort implementation in the code editor. Your function should take an array as input and return the sorted array.
          </p>
        </div>
        
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 p-2 border-b border-gray-300 flex justify-between items-center">
            <span className="font-medium">Code Editor</span>
            
            <div>
              <button 
                onClick={resetExercise}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition mr-2"
              >
                Reset
              </button>
              <button 
                onClick={showSolution}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
              >
                Show Solution
              </button>
            </div>
          </div>
          <textarea
            className="w-full p-4 font-mono text-sm bg-gray-800 text-white"
            style={{ minHeight: '300px' }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-100 p-2 border-b border-gray-300 flex justify-between items-center">
              <span className="font-medium">Test Array</span>
              <button 
                onClick={generateRandomArray}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
              >
                New Array
              </button>
            </div>
            <div className="p-4">
              <code>[{testArray.join(', ')}]</code>
            </div>
          </div>
          
          <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-100 p-2 border-b border-gray-300 flex justify-between items-center">
              <span className="font-medium">Output</span>
              <button 
                onClick={testCode}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
              >
                Run Test
              </button>
            </div>
            <div className={`p-4 whitespace-pre-wrap font-mono text-sm ${isCorrect ? 'bg-green-50' : output ? 'bg-red-50' : ''}`}>
              {output || 'Click "Run Test" to test your implementation'}
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
}