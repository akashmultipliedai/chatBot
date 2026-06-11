import "dotenv/config"
import { createAgent } from "langchain";
import { getuserDetails } from "../tools/getuserdetails.js";
import { MongoClient } from "mongodb";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { setServers } from "node:dns";
import { pdfRetrievalTool } from "../tools/PdfRetrieval.js";



setServers(["1.1.1.1", "8.8.8.8"]);


const MONGO_URI = process.env.MONGODB_URL;
const client = new MongoClient(`${MONGO_URI}`);
await client.connect();

const SYSTEM_PROMPT = `You are an intelligent company assistant. You have access to tools to help answer the user's questions.
        - If the user asks about their profile or role, use the get_user_details tool.
        - If the user asks about documents, policies, or general knowledge, use the pdf_retriever tool.
        - If you do not know the answer after using the tools, state clearly that you cannot find the information. 
        Do not make up facts.`;

const checkpointer = new MongoDBSaver({
  client: client as any,
  dbName: "Akash_testing",
  checkpointCollectionName: "chatBot",
  checkpointWritesCollectionName: "Akash_testing_writes"
});

export const agent = createAgent({
  model: "gpt-4o-mini",
  tools: [getuserDetails, pdfRetrievalTool],
  systemPrompt: SYSTEM_PROMPT,
  checkpointer,
});