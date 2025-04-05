"use client";
import ProblemDescription from "@/components/ProblemDescription";
import { useParams } from "next/navigation";

export default function Problem() {
    const params = useParams();
    const slug: string = params.slug ? params.slug.toString() : "";

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 capitalize">Problem: {slug.replace(/-/g, " ")}</h1>
            <ProblemDescription problemname={slug} />
        </div>
    );
}
