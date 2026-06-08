import {tool} from "@langchain/core/tools";
import {z} from "zod";

export const getweather = tool(
    async(input)=>{
        return `a,jsdglakjb`
    },{
        name: "get_weather",
        description: "get the current weather for a given city",
        schema: z.object({
            city:z.string().describe("The city to get the weather for , e.g., Tokyo or New York"),
        }),
    }
);