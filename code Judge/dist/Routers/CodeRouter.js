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
const express_1 = require("express");
const FileService_1 = __importDefault(require("../Services/FileService"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const CodeExecutionFacade_1 = __importDefault(require("../Services/CodeExecutionFacade"));
const upload = (0, multer_1.default)({ dest: "./codefiles/" });
const CodeRouter = (0, express_1.Router)();
CodeRouter.post('/execute', upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log("Received request with body:", req.body);
    //console.log("Received file:", req.file);    
    const { filename } = req.file;
    //console.log("filename ",filename);
    const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const newFileName = `solution_${Date.now()}.py`;
    const newFilePath = path_1.default.join("./codefiles", newFileName);
    if (!req.file) {
        // console.log("No file found");
        return res.status(400).send("No file uploaded");
    }
    const { problemName, language } = req.body;
    //console.log("language ",language);
    try {
        FileService_1.default.rename(filePath !== null && filePath !== void 0 ? filePath : "", newFilePath);
        const result = yield CodeExecutionFacade_1.default.run(problemName, newFileName, language);
        res.json({ "result": result });
    }
    catch (error) {
        console.error("Error saving file:", error);
        res.status(500).send("Error saving file");
    }
}));
exports.default = CodeRouter;
