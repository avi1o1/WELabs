"use client";
import React from 'react';
import PageContent from '@/components/PageContent';

export default function BubbleSortAlgorithmPage() {
  return (
    <PageContent 
      title="Bubble Sort - Algorithm" 
      subtitle="Step-by-step implementation of the Bubble Sort algorithm"
    >
      <div className="space-y-4">
        <h3 className="text-xl font-medium mb-2">Pseudocode</h3>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <pre>{`procedure bubbleSort(A: list of sortable items)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n-1 do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
            end if
        end for
        n = n - 1
    until not swapped
end procedure`}</pre>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-2">JavaScript Implementation</h3>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <pre>{`function bubbleSort(arr) {
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
}`}</pre>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-2">Python Implementation</h3>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
          <pre>{`def bubble_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n - 1):
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return arr`}</pre>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-2">Detailed Explanation</h3>
        <p>
          The Bubble Sort algorithm works by:
        </p>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Using two nested loops: an outer loop that tracks the number of passes, and an inner loop that performs comparisons and swaps</li>
          <li>In each iteration of the inner loop, adjacent elements are compared and swapped if they're in the wrong order</li>
          <li>After each complete pass through the array (one iteration of the outer loop), the largest unsorted element "bubbles up" to its correct position</li>
          <li>With each pass, we need to make one fewer comparison because the last element from the previous pass is already in its correct position</li>
          <li>The algorithm continues until the entire array is sorted</li>
        </ol>
      </div>
    </PageContent>
  );
}