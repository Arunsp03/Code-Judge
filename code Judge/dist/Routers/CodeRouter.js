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
const multer_1 = __importDefault(require("multer"));
const CodeExecutionFacade_1 = __importDefault(require("../Services/CodeExecutionFacade"));
const upload = (0, multer_1.default)({ dest: "./codefiles/" });
const CodeRouter = (0, express_1.Router)();
CodeRouter.post("/execute", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemName, language, sourceCode } = req.body;
    //console.log("language ",language);
    if (!problemName ||
        !language ||
        !sourceCode ||
        problemName.trim() == 0 ||
        language.trim() == 0 ||
        sourceCode.trim() == 0) {
        return res.status(404).send("missing parameters");
    }
    try {
        const result = yield CodeExecutionFacade_1.default.run(problemName, language, sourceCode);
        res.json({ result: result });
    }
    catch (error) {
        console.error("Error saving file:", error);
        res.status(500).send("Error saving file");
    }
}));
exports.default = CodeRouter;
