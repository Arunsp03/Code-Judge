"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileService_1 = __importDefault(require("./FileService"));
const CodeExecutor_1 = __importDefault(require("./CodeExecutor"));
const commonUtils_1 = require("../Utils/commonUtils");
class CodeExecutionFacade {
    constructor() {
        this.run = (problemName, language, sourceCode) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                let result = [];
                const metaData = yield this._fileService.readProblemMetaData(problemName);
                const inputFiles = (_a = (yield this._fileService.findInputfiles(problemName))) !== null && _a !== void 0 ? _a : [];
                const outputFiles = (_b = (yield this._fileService.findOutputfiles(problemName))) !== null && _b !== void 0 ? _b : [];
                // Capitalize problem name
                for (let fileIndex = 0; fileIndex < inputFiles.length; fileIndex++) {
                    const testInputs = yield this._fileService.readProblemTestInputs(problemName, inputFiles[fileIndex]);
                    const testOutputs = yield this._fileService.readProblemTestOutputs(problemName, outputFiles[fileIndex]);
                    let inputs = (_c = testInputs === null || testInputs === void 0 ? void 0 : testInputs.split(" ")) !== null && _c !== void 0 ? _c : [];
                    let expectedOutput = testOutputs;
                    let metaDataParameters = (_d = metaData === null || metaData === void 0 ? void 0 : metaData.split("\r\n")) !== null && _d !== void 0 ? _d : [];
                    metaDataParameters = metaDataParameters.slice(0, metaDataParameters.length - 1);
                    let functionArgs = [];
                    let j = 0;
                    for (let index = 3; index < metaDataParameters.length; index++) {
                        const paramType = metaDataParameters[index].split(":")[1];
                        if (inputs[j] !== undefined) {
                            let arg = inputs[j].trim(); // Trim whitespace
                            if (paramType === "string") {
                                arg = `"${arg.replace(/"/g, '\\"')}"`;
                            }
                            else if (paramType === "number") {
                                arg = Number(arg);
                            }
                            functionArgs.push(arg);
                        }
                        j++;
                    }
                    // console.log("function args",functionArgs);
                    // Construct the function call separately
                    const functionCall = `${(0, commonUtils_1.capitalizeWords)(problemName.replace("-", " ")).replace(" ", "")}(${functionArgs.join(", ")})`;
                    let printCall;
                    if (language == "python") {
                        printCall = "print";
                    }
                    else if (language == "node" || language == "javascript") {
                        printCall = "console.log";
                    }
                    // Full execution code
                    const fullCode = `${sourceCode}\n${printCall}(${functionCall})`;
                    try {
                        const actualOutput = yield this._codeExecutor.runSandboxedCode(fullCode, language);
                        console.log("\nActual Output:  ", actualOutput);
                        console.log("Expected Output:", expectedOutput);
                        if (actualOutput.trim() === (expectedOutput === null || expectedOutput === void 0 ? void 0 : expectedOutput.trim())) {
                            console.log("Test Case: ✅ Passed\n");
                            result.push("AC");
                        }
                        else {
                            console.log("Test Case: ❌ Failed\n");
                            result.push("WA");
                        }
                    }
                    catch (error) {
                        result.push("WA");
                        console.error("Execution error:", error);
                    }
                }
                return result;
            }
            catch (err) {
                console.error(err);
            }
        });
        this._codeExecutor = CodeExecutor_1.default;
        this._fileService = FileService_1.default;
    }
}
exports.default = new CodeExecutionFacade();
