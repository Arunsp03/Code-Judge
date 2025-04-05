"use client";
import { useEffect, useState } from "react";
import apiservice from "../../ApiService/apiservice";
import Problem from "@/components/Problem";

const { getProblems } = apiservice;

export default function Problems() {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblems();
            setProblems(data);
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Problems</h1>
            {problems && problems.map((item) => (
                <Problem key={item.id} problem={item} />
            ))}
        </div>
    );
}
