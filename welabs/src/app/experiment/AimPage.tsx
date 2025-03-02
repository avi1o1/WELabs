"use client";
import React from 'react';
import PageContent from '@/components/PageContent';

export default function AimPage() {
  return (
    <PageContent 
      title="Aim" 
      subtitle="Learning objectives of this experiment"
    >
      <p className="mb-4">
        The aim of this experiment is to understand the concept, implementation, and analysis of Bubble Sort algorithm.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Understand the basic concept of the Bubble Sort algorithm</li>
        <li>Learn to implement Bubble Sort in code</li>
        <li>Analyze the time and space complexity of Bubble Sort</li>
        <li>Compare Bubble Sort with other sorting algorithms</li>
        <li>Learn about optimizations for the Bubble Sort algorithm</li>
      </ul>
    </PageContent>
  );
}