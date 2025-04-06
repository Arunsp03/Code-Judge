"use client";
import React from "react";

interface TestCaseResultsProps {
  results: string[];
}

const statusColors: Record<string, string> = {
  AC: "bg-green-600",
  WA: "bg-red-600",
  TLE: "bg-yellow-600",
  RE: "bg-purple-600",
  // Add more if needed
};

export default function TestCaseResults({ results }: TestCaseResultsProps) {
  return (
    <div className="p-4 bg-gray-100 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Test Case Results</h2>
      <div className="flex flex-wrap gap-2">
        {results.map((result, index) => (
          <span
            key={index}
            className={`px-3 py-1 text-white rounded-full text-sm font-medium ${
              statusColors[result] || "bg-gray-500"
            }`}
          >
            Test {index + 1}: {result}
          </span>
        ))}
      </div>
    </div>
  );
}
