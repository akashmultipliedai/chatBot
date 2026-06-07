import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";

import {
    ChatPromptTemplate,
    MessagesPlaceholder
} from "@langchain/core/prompts";

import {
    RunnableWithMessageHistory
} from "@langchain/core/runnables";

import {
    InMemoryChatMessageHistory
} from "@langchain/core/chat_history";

import {
    StringOutputParser
} from "@langchain/core/output_parsers";



// MODEL
const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
});



// PROMPT TEMPLATE
const prompt = ChatPromptTemplate.fromMessages([

    [
        "system",
        "You are a helpful assistant."
    ],

    new MessagesPlaceholder("history"),

    [
        "human",
        "{input}"
    ]
]);



// CHAIN
const chain = prompt
    .pipe(model)
    .pipe(new StringOutputParser());



// MEMORY STORE
const store: Record<
    string,
    InMemoryChatMessageHistory
> = {};



// GET HISTORY
function getHistory(sessionId: string) {

    if (!store[sessionId]) {

        store[sessionId] =
            new InMemoryChatMessageHistory();
    }

    return store[sessionId];
}



// MEMORY WRAPPER
const chainWithMemory =
    new RunnableWithMessageHistory({

        runnable: chain,

        getMessageHistory: getHistory,

        inputMessagesKey: "input",

        historyMessagesKey: "history"
    });




// MAIN FUNCTION
export async function askLangchain(
    input: string,
    sessionId: string
) {

    const response =
        await chainWithMemory.invoke(

            {
                input
            },

            {
                configurable: {
                    sessionId
                }
            }
        );

    return response;
}