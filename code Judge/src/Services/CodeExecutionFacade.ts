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

  run = async (problemName: string, fileName: string,language:string) => {
    const metaData = await this._fileService.readProblemMetaData(problemName);
    const inputFiles = (await this._fileService.findInputfiles(problemName)) ?? [];
    const outputFiles = (await this._fileService.findOutputfiles(problemName)) ?? [];
    const sourceCode = await this._fileService.getSourceCode(fileName);

    // Capitalize problem name
    problemName = capitalizeWords(problemName).replace(" ", "");

    for (let fileIndex = 0; fileIndex < inputFiles.length; fileIndex++) {
      const testInputs = await this._fileService.readProblemTestInputs(problemName, inputFiles[fileIndex]);
      const testOutputs = await this._fileService.readProblemTestOutputs(problemName, outputFiles[fileIndex]);

      let inputs: any[] = testInputs?.split(" ") ?? [];
      let expectedOutput = testOutputs;
      let metaDataParameters: string[] = metaData?.split("\r\n") ?? [];

      metaDataParameters = metaDataParameters.slice(0, metaDataParameters.length - 1);

      let functionArgs: string[] = [];
      let j = 0;

      for (let index = 3; index < metaDataParameters.length; index++) {
        // let paramType = metaDataParameters[index].split(":")[1];

        // if (paramType === "number") {
        //   inputs[j] = Number(inputs[j]);
        // }
        functionArgs.push(inputs[j]);
        j++;
      }

      // Construct the function call separately
      const functionCall = `${problemName}(${functionArgs.join(", ")})`;

      // Full execution code
      const fullCode = `${sourceCode}\nprint(${functionCall})`;

      try {
        const actualOutput = await this._codeExecutor.runSandboxedCode(fullCode, language);
        
        console.log("\nActual Output:  ", actualOutput);
        console.log("Expected Output:", expectedOutput);
      
        if (actualOutput.trim() === expectedOutput?.trim()) {
          console.log("Test Case: ✅ Passed\n");
        } else {
          console.log("Test Case: ❌ Failed\n");
        }
      } catch (error) {
        console.error("Execution error:", error);
      }
    }
  };
}

export default new CodeExecutionFacade();
