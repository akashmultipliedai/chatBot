import express from "express";
import cors from "cors";
import { convoAskAi } from "./services/helperfunction.js";
const app = express();
app.use(cors());
app.use(express.json());
const messages = [
    {
        role: "system",
        content: "You are a helpful assistant and answer user questions conversationally."
    }
];
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        messages.push({
            role: "user",
            content: message
        });
        const result = await convoAskAi(messages);
        const aiResponse = result.choices[0]?.message?.content ||
            "Sorry, I couldn't generate a response.";
        messages.push({
            role: "assistant",
            content: aiResponse
        });
        res.json({
            response: aiResponse,
            conversation: messages
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
//# sourceMappingURL=index.js.map