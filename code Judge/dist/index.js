"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CodeRouter_1 = __importDefault(require("./Routers/CodeRouter"));
const cors_1 = __importDefault(require("cors"));
const ProblemRouter_1 = require("./Routers/ProblemRouter");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/code", CodeRouter_1.default);
app.use("/api/v1/problem", ProblemRouter_1.ProblemRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000");
});
