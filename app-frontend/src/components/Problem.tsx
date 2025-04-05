"use client"
import Link from "next/link";

export default function Problem(props: any) {
    return (
        <div className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-200 bg-white mb-4">
            <p className="text-lg font-semibold text-gray-800 mb-2">{props.problem.title}</p>
            <Link
                href={`/problem/${props.problem.problemId}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Solve
            </Link>
        </div>
    );
}
