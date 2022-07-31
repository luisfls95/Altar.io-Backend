"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const functions_1 = require("./functions");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/getGridAndCode", (req, res) => {
    const rowNum = req.body.rowNum;
    const colNum = req.body.colNum;
    const inputLetter = req.body.inputLetter;
    const dataToSend = (0, functions_1.getValuesArray)(rowNum, colNum, inputLetter);
    const code = (0, functions_1.getCode)(dataToSend);
    res.send({ grid: dataToSend, code: code });
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
