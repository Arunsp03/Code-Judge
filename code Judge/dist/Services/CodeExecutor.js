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
const dotenv_1 = require("dotenv");
const commonUtils_1 = require("../Utils/commonUtils");
const axios_1 = __importDefault(require("axios"));
(0, dotenv_1.configDotenv)();
class CodeExecutor {
    constructor() {
        this.JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
        this.RAPIDAPI_KEY = process.env.JUDGE0_API_KEY;
        this.submitCode = (sourceCode, languageId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${this.JUDGE0_API_URL}/submissions`, {
                    language_id: languageId,
                    source_code: sourceCode,
                }, {
                    headers: {
                        "X-RapidAPI-Key": this.RAPIDAPI_KEY,
                        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                        "Content-Type": "application/json"
                    },
                    params: { base64_encoded: "false", fields: "*" }
                });
                return response.data.token;
            }
            catch (error) {
                console.error("Error submitting code:", error);
            }
        });
        this.getExecutionResult = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.JUDGE0_API_URL}/submissions/${token}`, {
                    headers: {
                        "X-RapidAPI-Key": this.RAPIDAPI_KEY,
                        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
                    },
                    params: { base64_encoded: "false", fields: "*" }
                });
                return response.data;
            }
            catch (error) {
                console.error("Error fetching execution result:", error);
            }
        });
        // runSandboxedCode(sourceCode:string,language:string):string
        // {
        //   const languageCode=returnLanguage(language);
        //   console.log("source code",sourceCode);
        //   console.log("language",language);
        //   console.log("language code ",languageCode);
        //   return "hi";
        // }
    }
    runSandboxedCode(sourceCode, language) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("source code",sourceCode);
                const languageCode = Number((0, commonUtils_1.returnLanguage)(language));
                const token = yield this.submitCode(sourceCode, languageCode); // Submit code and get token
                if (!token)
                    throw new Error("Failed to submit code");
                return new Promise((resolve, reject) => {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const result = yield this.getExecutionResult(token);
                            if (result.stdout) {
                                resolve(result.stdout.trim().replace("None", ""));
                            }
                            else if (result.stderr) {
                                reject(new Error(`Execution Error: ${result.stderr}`));
                            }
                            else {
                                reject(new Error("Unknown execution error"));
                            }
                        }
                        catch (error) {
                            reject(error);
                        }
                    }), 3000);
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.default = new CodeExecutor();
