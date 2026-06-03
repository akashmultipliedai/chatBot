import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { AskAi } from "./services/helperfunction.js";
import { convoAskAi } from "./services/convohelperfunction.js";
// import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";


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

main();