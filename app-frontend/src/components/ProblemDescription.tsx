"use client";
import apiservice from "@/ApiService/apiservice";
import { marked } from "marked";
import { useEffect, useState } from "react";

const { getProblemDescription } = apiservice;

export default function ProblemDescription({ problemname }: { problemname: string }) {
    const [problemDescription, setProblemDescription] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblemDescription(problemname);
            const html = marked.parse(data.data);
            setProblemDescription(html);
        };
        fetchData();
    }, [problemname]);

    return (
        <div className="prose prose-lg max-w-3xl mx-auto mt-8" dangerouslySetInnerHTML={{ __html: problemDescription }} />
    );
}
