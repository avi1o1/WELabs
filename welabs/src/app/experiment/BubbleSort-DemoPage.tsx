"use client";
import React, { useState, useEffect } from 'react';
import PageContent from '@/components/PageContent';

export default function BubbleSortDemoPage() {
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [sortingIndex, setSortingIndex] = useState(-1);
  const [compareIndex, setCompareIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Generate a new random array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    resetSortingState();
  };

  // Reset sorting state
  const resetSortingState = () => {
    setSortingIndex(-1);
    setCompareIndex(-1);
    setSortedIndices([]);
    setIsSorting(false);
    setCurrentIteration(0);
    setSteps([]);
    setCurrentStep(0);
  };

  // Start automatic sorting
  const startSorting = () => {
    setIsSorting(true);
    
    // Generate all the steps for sorting
    const newSteps: string[] = [];
    const arrCopy = [...array];
    const n = arrCopy.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Add compare step
        newSteps.push(`compare,${j},${j+1}`);
        
        if (arrCopy[j] > arrCopy[j + 1]) {
          // Add swap step
          newSteps.push(`swap,${j},${j+1}`);
          [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        }
      }
      // Mark element as sorted
      newSteps.push(`sorted,${n-i-1},-1`);
    }
    // Mark the first element as sorted too
    newSteps.push(`sorted,0,-1`);
    
    setSteps(newSteps);
    setCurrentStep(0);
  };

  // Perform one step of bubble sort
  const performSortStep = () => {
    if (currentStep >= steps.length) return;
    
    const step = steps[currentStep];
    const [action, i, j] = step.split(',');
    
    const iIdx = parseInt(i);
    const jIdx = parseInt(j);
    
    if (action === 'compare') {
      setSortingIndex(iIdx);
      setCompareIndex(jIdx);
    } else if (action === 'swap') {
      const newArray = [...array];
      [newArray[iIdx], newArray[jIdx]] = [newArray[jIdx], newArray[iIdx]];
      setArray(newArray);
    } else if (action === 'sorted') {
      setSortedIndices(prev => [...prev, iIdx]);
    }
    
    setCurrentStep(currentStep + 1);
  };

  // Effect to handle automatic stepping
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isSorting && currentStep < steps.length) {
      timer = setTimeout(() => {
        performSortStep();
      }, 1000);
    } else if (currentStep >= steps.length) {
      setIsSorting(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSorting, currentStep, steps]);

  return (
    <PageContent 
      title="Bubble Sort - Demo" 
      subtitle="Visual demonstration of the Bubble Sort algorithm"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-end space-x-2 h-64">
            {array.map((value, index) => (
              <div 
                key={index}
                style={{ height: `${value * 2}px` }}
                className={`w-12 flex items-center justify-center text-white font-bold rounded-t-md transition-all duration-300
                  ${sortedIndices.includes(index) ? 'bg-green-500' : 
                    index === sortingIndex ? 'bg-red-500' : 
                    index === compareIndex ? 'bg-blue-500' : 'bg-gray-500'}`}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4 justify-center">
          <button 
            onClick={generateRandomArray}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            disabled={isSorting}
          >
            Generate New Array
          </button>
          
          {!isSorting ? (
            <button 
              onClick={startSorting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Start Sorting
            </button>
          ) : (
            <button 
              onClick={() => setIsSorting(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Pause
            </button>
          )}
          
          <button 
            onClick={performSortStep}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            disabled={isSorting || currentStep >= steps.length}
          >
            Next Step
          </button>
          
          <button 
            onClick={resetSortingState}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            disabled={isSorting}
          >
            Reset
          </button>
        </div>
        
        <div className="mt-8 bg-gray-100 p-4 rounded-md">
          <h3 className="font-medium mb-2">Algorithm Explanation:</h3>
          <p>
            {currentStep === 0 ? (
              "Click 'Start Sorting' to begin the demonstration. The animation will show how adjacent elements are compared and swapped until the array is sorted."
            ) : currentStep >= steps.length ? (
              "Sorting complete! The array is now fully sorted."
            ) : steps[currentStep-1].startsWith('compare') ? (
              `Comparing elements at positions ${sortingIndex} and ${compareIndex}.`
            ) : steps[currentStep-1].startsWith('swap') ? (
              `Swapping elements ${array[compareIndex]} and ${array[sortingIndex]} because ${array[compareIndex]} < ${array[sortingIndex]}.`
            ) : (
              `Element ${array[parseInt(steps[currentStep-1].split(',')[1])]} is now in its correct position.`
            )}
          </p>
        </div>
      </div>
    </PageContent>
  );
}