"use client";
import React from 'react';
import PageContent from '@/components/PageContent';

export default function RecapPage() {
  return (
    <PageContent 
      title="Recap" 
      subtitle="Prerequisites for understanding Bubble Sort"
    >
      <div className="space-y-4">
        <p>
          Before diving into Bubble Sort, let's review some fundamental concepts:
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-2">Arrays</h3>
        <p>
          An array is a collection of elements identified by index. Arrays are the most basic data structure and are fundamental to understanding sorting algorithms.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-2">Comparison Operations</h3>
        <p>
          Sorting requires comparing elements to determine their relative order. In most programming languages, we use operators like &lt;, &gt;, ≤, ≥, =, and ≠ for comparisons.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-2">Swapping Elements</h3>
        <p>
          A key operation in many sorting algorithms is swapping elements when they are out of order. Swapping involves temporarily storing the value of one element while replacing it with another.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">Basic swap operation in pseudocode:</p>
          <pre className="mt-2">
          temp = A[i]
          A[i] = A[j]
          A[j] = temp
          </pre>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-2">Algorithm Complexity</h3>
        <p>
          Understanding the efficiency of algorithms in terms of time (how long it takes to run) and space (how much memory it uses) is crucial. We express this using Big O notation.
        </p>
      </div>
    </PageContent>
  );
}