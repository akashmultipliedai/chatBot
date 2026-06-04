import OpenAI from "openai";
import "dotenv/config";
import process from "process";
const client = new OpenAI({
    apiKey: process.env.SECRET_KEY
});
// Function to interact with OpenAI's chat completion API
// This function takes an array of messages as input and returns the AI's response
export const convoAskAi = async (inputprompt) => {
    try {
        // console.log(inputprompt);
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: inputprompt
        });
        // console.log(response.choices[0]?.message);
        return response;
    }
    catch (error) {
        console.error("Error in AskAi function:", error);
        throw error;
    }
};
//# sourceMappingURL=helperfunction.js.map