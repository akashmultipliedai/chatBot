import "dotenv/config"

import {agent} from "./agents/agents.js"

async function main(){
    const query = "what is the weather in the tokyo today";
    const result= await agent.invoke({
        messages:[{
            role:"user",
            content:query
        }]
    })

    console.log(result);
}