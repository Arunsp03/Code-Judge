"use client"
import Link from "next/link";

export default function Problem(props: any) {
    const getDifficultyLabel = (level: string) => {
        switch (level) {
            case "Easy":
                return { text: "Easy", color: "text-green-600" };
            case "Medium":
                return { text: "Medium", color: "text-yellow-600" };
            case "Hard":
                return { text: "Hard", color: "text-red-600" };
            default:
                return { text: "Unknown", color: "text-gray-500" };
        }
    };

    const difficultyInfo = getDifficultyLabel(props.problem.difficulty);
    return (
        <div className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-200 bg-white mb-4">
        <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold text-gray-800">{props.problem.title}</p>
            <span className={`text-sm font-medium ${difficultyInfo.color}`}>
                {props.problem.difficulty}
            </span>
        </div>
        <Link
            href={`/problem/${props.problem.problemId}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            Solve
        </Link>
    </div>
)
}
