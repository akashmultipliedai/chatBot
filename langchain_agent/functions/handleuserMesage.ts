import "dotenv/config"
import { agent } from "../agents/agents.js"

export const handleuserMessage=  async(userId:string , userPrompt:string, res?:any) => {
    const streamingOptions = {
        version:"v3" as const,
        configurable:{thread_id:`user_thread_${userId}`}};

    console.log(`User: ${userPrompt}\n`);
    console.log("Thinking...\n");
    const stream = await agent.streamEvents({
        messages: [{
            role: "user",
            content: userPrompt
        }]
    },
    streamingOptions
)
    let fullAnswer="";

    for await(const message of stream.messages){
        for await(const delta of message.text){
            process.stdout.write(delta);
            fullAnswer+=delta;

            if(res){
                res.write(`data: ${JSON.stringify({token : delta})}\n\n`);
            }
        }
    }

    console.log("\n");
    return fullAnswer;
}

// export default handleuserMesage;