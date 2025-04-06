"use client";
import ProblemDescription from "@/components/ProblemDescription";
import { Editor } from "@monaco-editor/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TestCaseResults from "@/components/TestCaseResults";
import apiservice from "@/ApiService/apiservice";

const { getProblemBoilerplateCode, submitCode } = apiservice;

export default function Problem() {
  const params = useParams();
  const slug: string = params.slug ? params.slug.toString() : "";

  const [code, setCode] = useState("// write your code here");
  const [results, setResults] = useState<string[]>([]);
  const [language, setLanguage] = useState<"javascript" | "python">("javascript");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      console.log("Submitting Code:");
      console.log("Language:", language);
      console.log("Code:", code);
      const data = await submitCode(slug, language, code);
      console.log("data", data);
      setResults(data.result || []);
    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const fetchBoilerplateCode = async () => {
      const data = await getProblemBoilerplateCode(slug, language);
      const code = data.data;
      setCode(code);
    };
    fetchBoilerplateCode();
  }, [language]);

  return (
    <div className="flex h-screen">
     
      <div className="w-1/2 p-6 overflow-y-auto bg-white">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
          Problem: {slug.replace(/-/g, " ")}
        </h1>
        <ProblemDescription problemname={slug} />
      </div>

     
      <div className="w-1/2 bg-gray-900 flex flex-col">
       
        <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <label className="mr-2 font-medium">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "javascript" | "python")}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          >
            <option value="javascript">Node.js</option>
            <option value="python">Python</option>
          </select>
        </div>

        
        <div className="h-[73vh]">
          <Editor
            language={language}
            value={code}
            onChange={(value) => setCode(value ?? "")}
            theme="vs-dark"
            height="100%"
          />
        </div>

       
        <div className="p-4 bg-gray-900 text-right shrink-0">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <div>
            {loading ? (
              <div className="p-4 text-white text-center animate-pulse">
                Submitting code and waiting for results...
              </div>
            ) : (
              results.length > 0 && <TestCaseResults results={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
