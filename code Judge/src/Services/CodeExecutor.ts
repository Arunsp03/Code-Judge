import { configDotenv } from "dotenv";
import { Languages } from "../Utils/commonUtils";
import { returnLanguage } from "../Utils/commonUtils";
import axios from "axios";
configDotenv();

class CodeExecutor{
  private readonly JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
  private readonly RAPIDAPI_KEY = process.env.JUDGE0_API_KEY; 

 submitCode = async (sourceCode: string, languageId: number) => {
  try {
    const response = await axios.post(
      `${this.JUDGE0_API_URL}/submissions`,
      {
        language_id: languageId,
        source_code: sourceCode,
       
      },
      {
        headers: {
          "X-RapidAPI-Key": this.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json"
        },
        params: { base64_encoded: "false", fields: "*" }
      }
    );

    return response.data.token; 
  } catch (error) {
    console.error("Error submitting code:", error);
  }
};


 getExecutionResult = async (token: string) => {
  try {
    const response = await axios.get(`${this.JUDGE0_API_URL}/submissions/${token}`, {
      headers: {
        "X-RapidAPI-Key": this.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      params: { base64_encoded: "false", fields: "*" }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching execution result:", error);
  }
};
async runSandboxedCode(sourceCode: string,language:string): Promise<string> {
  
  //console.log("source code",sourceCode);
  
  const languageCode=Number(returnLanguage(language));
  const token = await this.submitCode(sourceCode,languageCode); // Submit code and get token
  if (!token) throw new Error("Failed to submit code");

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await this.getExecutionResult(token);
        if (result.stdout) {
          resolve(result.stdout.trim().replace("None", ""));
        } else if (result.stderr) {
          reject(new Error(`Execution Error: ${result.stderr}`));
        } else {
          reject(new Error("Unknown execution error"));
        }
      } catch (error) {
        reject(error);
      }
    }, 3000); 
  });
}




// runSandboxedCode(sourceCode:string,language:string):string
// {
//   const languageCode=returnLanguage(language);
//   console.log("source code",sourceCode);
//   console.log("language",language);
//   console.log("language code ",languageCode);
  
//   return "hi";
  
// }



}



export default new CodeExecutor();