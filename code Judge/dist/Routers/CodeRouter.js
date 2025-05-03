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
exports.requestStore = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CodeExecutionFacade_1 = __importDefault(require("../Services/CodeExecutionFacade"));
const Send_1 = require("../Services/MessageQueue/Send");
const uuid_1 = require("uuid");
const upload = (0, multer_1.default)({ dest: "./codefiles/" });
const CodeRouter = (0, express_1.Router)();
exports.requestStore = new Map();
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
CodeRouter.post("/queuecode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const requestId = (0, uuid_1.v4)();
        yield (0, Send_1.sendMessageToQueue)("CodeExecutionQueue", JSON.stringify({ "requestId": requestId, "problemName": problemName, "language": language, "sourceCode": sourceCode }));
        res.json({ requestId: requestId });
    }
    catch (err) {
        console.error("Error saving file:", err);
        res.status(500).send("Error saving file");
    }
}));
CodeRouter.get("/request/:requestid", (req, res) => {
    try {
        const { requestid } = req.params;
        //console.log("received request id",requestid)
        let result;
        if (exports.requestStore.has(requestid)) {
            result = exports.requestStore.get(requestid);
            res.json({ "status": "done", "result": result });
            exports.requestStore.delete(requestid);
        }
        else {
            res.json({ "status": "pending" });
        }
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.default = CodeRouter;
