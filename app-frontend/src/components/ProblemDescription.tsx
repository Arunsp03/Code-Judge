"use client";
import apiservice from "@/ApiService/apiservice";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const { getProblemDescription } = apiservice;

export default function ProblemDescription({ problemname }: { problemname: string }) {
    const [problemDescription, setProblemDescription] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProblemDescription(problemname);
            setProblemDescription(data.data); 
        };
        fetchData();
    }, [problemname]);

    return (
        <div className="prose prose-lg max-w-3xl mx-auto mt-8">
            <Markdown remarkPlugins={[remarkGfm]}>{problemDescription}</Markdown>
        </div>
    );
}
