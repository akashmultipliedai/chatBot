import "dotenv/config"
import  readline from "readline/promises"
import {stdin as input, stdout as output} from "process"

import { agent } from "./agents/agents.js"

async function handleuserMesage(userId:string , userPrompt:string) {
    const threadConfig = {configurable:{thread_id:`user_thread_${userId}`}};

    console.log(`User: ${userPrompt}\n`);
    console.log("Thinking...\n");
    const result = await agent.invoke({
        messages: [{
            role: "user",
            content: userPrompt
        }]
    },
    threadConfig
)

    const finalMessage = result.messages[result.messages.length - 1];
    const answer_to_qusetion=finalMessage?.content;
    return answer_to_qusetion;
}

async function main(){
    const r1= readline.createInterface({input,output});
    
    try{
        while(true){
        const input_prompt_from_terimnal= await r1.question('Enter Your Details or Enter "exit" to quit: ');

        if(input_prompt_from_terimnal.toLowerCase() === "exit"){
            r1.close();
            return;
        }else{
            const res1= await handleuserMesage("akash_77",`${input_prompt_from_terimnal}`);

            console.log(res1);
        }
    }
    }catch(error){
        console.log(error);
    }
   
}

main().catch((error)=>{
    console.log(error);
})


//  hello my name is akash Kumar dalag and age 25 and i am from the organizaton Intracom and my email id is akash@gmail.com