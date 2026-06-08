"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { convoAskAi } from "./services/helperfunction.js";
const langchainservice_js_1 = require("./services/langchainservice.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const messages = [
    {
        role: "system",
        content: "You are a helpful assistant and you will answer the question of user in a very helpful way and you will behave like a you are involved in a conversation and answer them with the context with the questions of the user"
    }
];
app.post("/chat", async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        const result = await (0, langchainservice_js_1.askLangchain)(message, sessionId);
        const aiResponse = result ||
            "Sorry, I couldn't generate a response.";
        res.json({
            response: aiResponse
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
