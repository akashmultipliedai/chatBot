import { createAgent } from "langchain";
import { getweather } from "../tools/tools.js";

const SYSTEM_PROMPT = `You are a helpful and concise weather assistant. 
Whenever a user asks about the weather, you must use the get_weather tool to find the answer.
Do not guess or make up weather data.`;

export const agent = createAgent({
 model: "gpt-4o-mini",
  tools: [getweather],
  systemPrompt: SYSTEM_PROMPT,
});