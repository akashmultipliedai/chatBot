import express from "express";
import cors from "cors";
// import { convoAskAi } from "./services/helperfunction.js";
import {askLangchain} from "./services/langchainservice.js"

const app = express();

app.use(cors());
app.use(express.json());

const messages = [
  {
    role: "system",
    content:
      "You are a helpful assistant and you will answer the question of user in a very helpful way and you will behave like a you are involved in a conversation and answer them with the context with the questions of the user"
  }
];

app.post("/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    const result = await askLangchain(message,sessionId);

    const aiResponse =
      result ||
      "Sorry, I couldn't generate a response.";

    res.json({
      response: aiResponse
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});