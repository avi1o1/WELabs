"use client";
import React from 'react';
import PageContent from '@/components/PageContent';

export default function OverviewPage() {
  return (
    <PageContent 
      title="Overview" 
      subtitle="Introduction to Sorting Algorithms and Bubble Sort"
    >
      <div className="space-y-4">
        <p>
          Sorting is one of the most fundamental operations in computer science. Efficient sorting is important for optimizing the efficiency of other algorithms that require input data to be in sorted order.
        </p>
        <p>
          Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. The algorithm gets its name because smaller elements "bubble" to the top of the list.
        </p>
        <p>
          While not the most efficient sorting algorithm for large datasets, Bubble Sort is easy to understand and implement, making it an excellent starting point for learning about sorting algorithms.
        </p>
        <p>
          Throughout this experiment, you will learn about:
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>The basic and optimized versions of the Bubble Sort algorithm</li>
          <li>Step-by-step demonstrations of how the algorithm works</li>
          <li>Implementation details and code examples</li>
          <li>Time and space complexity analysis</li>
          <li>Comparison with other sorting algorithms</li>
        </ul>
      </div>
    </PageContent>
  );
}