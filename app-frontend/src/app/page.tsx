
"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">CodeJudge</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Practice coding problems, submit solutions in multiple languages, and improve your skills.
        </p>
        <Link
          href="/problems"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>

      <div className="mt-16 max-w-3xl text-center text-gray-500 text-sm">
        <p>
          Built for learners, developers, and coding enthusiasts.
        </p>
      </div>
    </main>
  );
}

      