"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const child_process_1 = require("child_process");
class CodeExecutor {
    constructor() {
        this.executePython = (problemName, fileName, inputs) => {
            return new Promise((resolve, reject) => {
                fileName = fileName.split(".")[0];
                let formattedProblemName = "";
                let arr = problemName.split(" ");
                formattedProblemName = (0, utils_1.capitalizeWords)(problemName).replace(" ", "");
                let dataToSend = "";
                let inputForCode = ``;
                for (let index = 0; index < inputs.length; index++) {
                    if (index == inputs.length - 1) {
                        inputForCode += `${inputs[index]}`;
                    }
                    else {
                        inputForCode += `${inputs[index]},`;
                    }
                }
                const pythonProcess = (0, child_process_1.spawn)("python", [
                    "-c",
                    `import sys;sys.path.append('./codefiles'); import ${fileName};${fileName}.${formattedProblemName}(${inputForCode})`,
                ]);
                pythonProcess.stdout.on("data", (data) => {
                    dataToSend += data.toString().trim();
                });
                pythonProcess.stderr.on("data", (data) => {
                    console.log("error ", data.toString());
                    reject(data.toString());
                });
                pythonProcess.on("close", (code) => {
                    resolve(dataToSend.toString());
                });
                pythonProcess.on("error", (err) => {
                    reject(`Failed to start process: ${err.message}`);
                });
            });
        };
    }
}
exports.default = new CodeExecutor();
