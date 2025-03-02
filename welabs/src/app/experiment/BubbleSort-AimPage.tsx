"use client";
import React from 'react';
import PageContent from '@/components/PageContent';

export default function BubbleSortAimPage() {
  return (
    <PageContent 
      title="Bubble Sort - Aim" 
      subtitle="Learning objectives for the Bubble Sort algorithm"
    >
      <div className="space-y-4">
        <p>
          By the end of this section, you should be able to:
        </p>
        
        <ul className="list-disc ml-6 space-y-2">
          <li>Understand the basic principle behind the Bubble Sort algorithm</li>
          <li>Trace through the steps of the Bubble Sort algorithm on a small array</li>
          <li>Implement the Bubble Sort algorithm in code</li>
          <li>Identify scenarios where Bubble Sort might be appropriate or inappropriate</li>
          <li>Recognize the importance of algorithm efficiency and its impact on performance</li>
        </ul>
        
        <p className="mt-6">
          Bubble Sort serves as an excellent introduction to sorting algorithms due to its simplicity and intuitive approach. Although it's not the most efficient algorithm for large datasets, understanding Bubble Sort builds a foundation for exploring more complex sorting techniques.
        </p>
      </div>
    </PageContent>
  );
}