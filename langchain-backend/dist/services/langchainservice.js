"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askLangchain = askLangchain;
const openai_1 = require("@langchain/openai");
require("dotenv/config");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const chat_history_1 = require("@langchain/core/chat_history");
const output_parsers_1 = require("@langchain/core/output_parsers");
// MODEL
const model = new openai_1.ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
});
// PROMPT TEMPLATE
const prompt = prompts_1.ChatPromptTemplate.fromMessages([
    [
        "system",
        "You are a helpful assistant."
    ],
    new prompts_1.MessagesPlaceholder("history"),
    [
        "human",
        "{input}"
    ]
]);
// CHAIN
const chain = prompt
    .pipe(model)
    .pipe(new output_parsers_1.StringOutputParser());
// MEMORY STORE
const store = {};
// GET HISTORY
function getHistory(sessionId) {
    if (!store[sessionId]) {
        store[sessionId] =
            new chat_history_1.InMemoryChatMessageHistory();
    }
    return store[sessionId];
}
// MEMORY WRAPPER
const chainWithMemory = new runnables_1.RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: getHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history"
});
// MAIN FUNCTION
async function askLangchain(input, sessionId) {
    const response = await chainWithMemory.invoke({
        input
    }, {
        configurable: {
            sessionId
        }
    });
    return response;
}
