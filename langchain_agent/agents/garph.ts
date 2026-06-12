import { StateGraph, START, END, StateSchema, MessagesValue } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage } from "@langchain/core/messages";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoClient } from "mongodb";

// Import your custom tools
import { getuserDetails } from "../tools/getuserdetails.js";
import { pdfRetrievalTool } from "../tools/PdfRetrieval.js";

// 1. Initialize MongoDB Checkpointer
const MONGO_URI = process.env.MONGODB_URL || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);
await client.connect();

const checkpointer = new MongoDBSaver({
  client: client as any,
  dbName: "Akash_testing",
  checkpointCollectionName: "chatBot",
  checkpointWritesCollectionName: "Akash_testing_writes"
});


console.log("graph is being called");
// 2. Define the State Schema
export const AgentState = new StateSchema({
  messages: MessagesValue,
});

// 3. Initialize Tools & Model
const tools = [getuserDetails, pdfRetrievalTool];
const toolNode = new ToolNode(tools);
const model = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0 }).bindTools(tools);

// 4. Define Nodes
async function callModel(state: typeof AgentState.State) {
  
  const response = await model.invoke(state.messages);
  return { messages: [response] };
}

// 5. Define Routing Logic
function shouldContinue(state: typeof AgentState.State) {
  const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
  if (lastMessage?.tool_calls && lastMessage.tool_calls.length > 0) {
    return "tools";
  }
  return END;
}

// 6. Build and Compile the Workflow
const workflow = new StateGraph(AgentState)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent");

// Export the compiled graph ready for execution
export const compiledGraph = workflow.compile({ checkpointer });