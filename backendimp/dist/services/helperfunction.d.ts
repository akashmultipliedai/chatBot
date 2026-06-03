import OpenAI from "openai";
import "dotenv/config";
export declare const convoAskAi: (inputprompt: any[]) => Promise<OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string | null;
}>;
//# sourceMappingURL=helperfunction.d.ts.map