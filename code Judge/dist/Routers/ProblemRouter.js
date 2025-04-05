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
exports.ProblemRouter = void 0;
const express_1 = require("express");
const FileService_1 = __importDefault(require("../Services/FileService"));
exports.ProblemRouter = (0, express_1.Router)();
exports.ProblemRouter.post('/getProblemData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemName } = req.body;
    console.log("problemname ", problemName);
    const data = yield FileService_1.default.getProblemDescription(problemName);
    return res.json({ data: data });
}));
