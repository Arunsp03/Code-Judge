import FileService from "./FileService";
import CodeExecutor from "./CodeExecutor";
import { capitalizeWords } from "../Utils/commonUtils";

class CodeExecutionFacade {
  private readonly _fileService;
  private readonly _codeExecutor;

  constructor() {
    this._codeExecutor = CodeExecutor;
    this._fileService = FileService;
  }

  run = async (problemName: string, language: string, sourceCode: string) => {
    try {
      let result: string[] = [];
      const metaData = await this._fileService.readProblemMetaData(problemName);
      const inputFiles =
        (await this._fileService.findInputfiles(problemName)) ?? [];
      const outputFiles =
        (await this._fileService.findOutputfiles(problemName)) ?? [];

      // Capitalize problem name

      for (let fileIndex = 0; fileIndex < inputFiles.length; fileIndex++) {
        const testInputs = await this._fileService.readProblemTestInputs(
          problemName,
          inputFiles[fileIndex]
        );
        const testOutputs = await this._fileService.readProblemTestOutputs(
          problemName,
          outputFiles[fileIndex]
        );

        let inputs: any[] = testInputs?.split(" ") ?? [];
        let expectedOutput = testOutputs;
        let metaDataParameters: string[] = metaData?.split("\r\n") ?? [];

        metaDataParameters = metaDataParameters.slice(
          0,
          metaDataParameters.length - 1
        );

        let functionArgs: string[] = [];
        let j = 0;

        for (let index = 3; index < metaDataParameters.length; index++) {
          const paramType = metaDataParameters[index].split(":")[1];

          if (inputs[j] !== undefined) {
            let arg = inputs[j].trim(); // Trim whitespace

            if (paramType === "string") {
              arg = `"${arg.replace(/"/g, '\\"')}"`;
            } else if (paramType === "number") {
              arg = Number(arg);
            }

            functionArgs.push(arg);
          }
          j++;
        }

        // console.log("function args",functionArgs);

        // Construct the function call separately
        const functionCall = `${capitalizeWords(
          problemName.replace("-", " ")
        ).replace(" ", "")}(${functionArgs.join(", ")})`;

        let printCall;
        if (language == "python") {
          printCall = "print";
        } else if (language == "node" || language == "javascript") {
          printCall = "console.log";
        }
        // Full execution code
        const fullCode = `${sourceCode}\n${printCall}(${functionCall})`;

        try {
          const actualOutput = await this._codeExecutor.runSandboxedCode(
            fullCode,
            language
          );

          console.log("\nActual Output:  ", actualOutput);
          console.log("Expected Output:", expectedOutput);

          if (actualOutput.trim() === expectedOutput?.trim()) {
            console.log("Test Case: ✅ Passed\n");
            result.push("AC");
          } else {
            console.log("Test Case: ❌ Failed\n");
            result.push("WA");
          }
        } catch (error) {
          result.push("WA");
          console.error("Execution error:", error);
        }
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  };
}

export default new CodeExecutionFacade();
