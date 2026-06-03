import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import express from "express";
import r1 from "./routes/r1.js";
// import { AskAi } from "./services/helperfunction.js";
import { convoAskAi } from "./services/helperfunction.js";
// import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const app = express();
app.use(express.json());
app.use('/api', r1);

async function main() {
    const rl = readline.createInterface({ input, output });
    const messages = [
        {
            role: "system",
            content: "You are a helpful assistant and you will answer the question of user in a very helpful way and you will behave like a you are involved in a conversation and answer them with the context with the questions of the user"
        }
    ];
    while (true) {
        try {
            const inputprompt = await rl.question('Enter Your Question or Enter "exit" to quit: ');

            if (inputprompt.toLowerCase() === "exit") {
                console.log("Goodbye!");
                rl.close();
                return;
            }
            else{
                messages.push({
                    role: "user",
                    content: inputprompt
                });
            }

            const result = await convoAskAi(messages);
            // console.log(result.output_text);
            console.log(result.choices[0]?.message.content);
            const responsefromai: any = result.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
            messages.push({
                role:"assistant",
                content:responsefromai
            });
        } catch (error) {
            console.log(error);
        } 
    }
}

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    main();
});

// main();