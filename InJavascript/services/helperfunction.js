import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.SECRET_KEY
});

export const res = async (prompt) => {
    // console.log(client);

    try {
        const response = await client.responses.create({
            model: "gpt-5.5",
            input: prompt
        });
        return response;

    } catch (error) {
        console.log(error);
    }
}


