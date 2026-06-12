import "dotenv/config"
// import { agent } from "../agents/agents.js"
// import { getCompileCacheDir } from "node:module";
import { HumanMessage } from "@langchain/core/messages";
import { compiledGraph } from "../agents/garph.js";

export const handleuserMessage = async (userId: string, userPrompt: string, res?: any) => {
    const streamingOptions = {
        version: "v2" as const,
        configurable: { thread_id: `user_thread_${userId}` }
    };

    console.log(`User: ${userPrompt}\n`);
    console.log("Thinking...\n");

    const stream = compiledGraph.streamEvents({
        messages: [new HumanMessage(userPrompt)]
    },
        streamingOptions
    )

    let fullAnswer = "";

    for await (const event of stream) {

        if (event.event === "on_chat_model_stream") {
            const chunk = event.data.chunk;

            if (chunk && chunk.content && typeof chunk.content === "string") {
                process.stdout.write(chunk.content);

                fullAnswer += chunk.content;

                if (res) {
                    res.write(`data: ${JSON.stringify({ token: chunk.content })}\n\n`);
                }
            }
        }
    }

    console.log("\n");
    return fullAnswer;
}

// export default handleuserMesage;