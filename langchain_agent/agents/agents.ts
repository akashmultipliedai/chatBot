import { createAgent } from "langchain";
import { getweather } from "../tools/tools.js";
import { getuserDetails } from "../tools/getuserdetails.js";
import { MongoClient } from "mongodb";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { setServers } from "node:dns";


setServers(["1.1.1.1","8.8.8.8"]);

const MONGO_URI = "mongodb+srv://hseuser:4KD4bgRfzzGXgRe4@near-miss-dev.8s6fkqs.mongodb.net/Akash_testing?retryWrites=true&w=majority&appName=multiplied-dev"; 
const client = new MongoClient(MONGO_URI);
await client.connect();

const SYSTEM_PROMPT = `You are a helpful AI assistant that extracts user profile details (such as name, age, organization, and email) from the conversation and displays them clearly.`;

const checkpointer = new MongoDBSaver({
  client: client as any,
  dbName: "Akash_testing",
  checkpointCollectionName: "chatBot",
  checkpointWritesCollectionName: "Akash_testing_writes" 
});

export const agent = createAgent({
  model: "gpt-4o-mini",
  tools: [getuserDetails], 
  systemPrompt: SYSTEM_PROMPT,
  checkpointer,
});