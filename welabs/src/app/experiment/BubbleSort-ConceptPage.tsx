"use client";
import React from 'react';
import PageContent from '@/components/PageContent';

export default function BubbleSortConceptPage() {
  return (
    <PageContent 
      title="Bubble Sort - Concept" 
      subtitle="Understanding the core idea behind Bubble Sort"
    >
      <div className="space-y-4">
        <p>
          Bubble Sort is a simple comparison-based sorting algorithm. The algorithm gets its name because elements "bubble" to their correct positions, similar to how air bubbles rise to the surface of water.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-2">The Core Concept</h3>
        <p>
          The fundamental concept of Bubble Sort is to repeatedly compare adjacent elements and swap them if they are in the wrong order. This process continues until the entire array is sorted.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md mt-4">
          <p className="font-medium mb-2">Key Properties of Bubble Sort:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>It's a comparison-based algorithm</li>
            <li>It's an in-place sorting algorithm (doesn't require extra space)</li>
            <li>It's a stable sorting algorithm (maintains the relative order of equal elements)</li>
            <li>Time complexity: O(n²) in worst and average cases</li>
            <li>Space complexity: O(1)</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-2">How It Works</h3>
        <p>
          In each pass through the array:
        </p>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Starting from the first element, compare adjacent elements</li>
          <li>If the current element is greater than the next element, swap them</li>
          <li>Continue this process for each pair of adjacent elements until the end of the array</li>
          <li>After one complete pass, the largest element will have "bubbled up" to the end of the array</li>
          <li>Repeat the process for the remaining elements (excluding those that are already in position)</li>
        </ol>
        
        <p className="mt-4">
          After each pass, one more element is guaranteed to be in its correct final position. Therefore, for an array of n elements, at most n-1 passes are needed to sort the array completely.
        </p>
      </div>
    </PageContent>
  );
}