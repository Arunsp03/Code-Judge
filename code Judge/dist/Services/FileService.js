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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class FileService {
    constructor() {
        this.findInputfiles = (problemName) => __awaiter(this, void 0, void 0, function* () {
            try {
                problemName = problemName.replace(" ", "");
                const inputFiles = yield fs_1.promises.readdir(`../problems/tests/${problemName}/inputs`);
                return inputFiles;
            }
            catch (err) {
                console.log("error ", err);
            }
        });
        //gets count of no of output files to be compared
        this.findOutputfiles = (problemName) => __awaiter(this, void 0, void 0, function* () {
            try {
                problemName = problemName.replace(" ", "");
                const outputFiles = yield fs_1.promises.readdir(`../problems/tests/${problemName}/outputs`);
                return outputFiles;
            }
            catch (err) {
                console.log("error ", err);
            }
        });
        this.readProblemTestInputs = (problemName, fileName) => __awaiter(this, void 0, void 0, function* () {
            try {
                problemName = problemName.replace(" ", "");
                const data = yield fs_1.promises.readFile(`../problems/tests/${problemName}/inputs/${fileName}`, "utf8");
                return data;
            }
            catch (err) {
                console.error(err);
            }
        });
        this.readProblemMetaData = (problemName) => __awaiter(this, void 0, void 0, function* () {
            try {
                problemName = problemName.replace(" ", "");
                const data = yield fs_1.promises.readFile(`../problems/problems-metadata/${problemName}.txt`, "utf-8");
                return data;
            }
            catch (err) {
                console.log("error ", err);
            }
        });
        this.readProblemTestOutputs = (problemName, fileName) => __awaiter(this, void 0, void 0, function* () {
            try {
                problemName = problemName.replace(" ", "");
                const data = yield fs_1.promises.readFile(`../problems/tests/${problemName}/outputs/${fileName}`, "utf-8");
                return data;
            }
            catch (err) {
                console.log("error ", err);
            }
        });
        this.getSourceCode = (fileName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sourceCode = yield fs_1.promises.readFile(`./codefiles/${fileName}`);
                return sourceCode.toString();
            }
            catch (err) {
                console.error(err);
            }
        });
        this.getProblemDescription = (problemName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.promises.readFile(`../problems/problems-structure/${problemName}.md`, "utf-8");
                console.log("data", data);
                return data;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    rename(oldFilePath, newFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.rename(oldFilePath, newFilePath);
            }
            catch (error) {
                console.error("Rename error:", error);
                throw new Error("Failed to rename file");
            }
        });
    }
}
exports.default = new FileService();
