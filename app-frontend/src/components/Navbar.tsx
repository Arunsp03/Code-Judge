"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
        <Link
              href="/"
             
            >
              CodeJudge
            </Link>
          
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/problems"
              className="text-white hover:text-blue-600 font-medium"
            >
              Problems
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
