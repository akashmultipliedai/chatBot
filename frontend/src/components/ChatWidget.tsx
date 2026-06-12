import { useState } from "react";
import ChatBox from "./ChatBox";
import MessageInput from "./InputBox";
import { TbMessageChatbotFilled } from "react-icons/tb";
import type { Message } from "../types";
// import { Rnd } from "react-rnd";

const Chatwidget = () => {
    const [isopen, setIsopen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (message: string) => {
        try {
            // 1. Instantly show the user's message AND create a blank placeholder for the AI
            setMessages((prev) => [
                ...prev,
                { role: "user", content: message },
                { role: "assistant", content: "" } // Empty string that we will fill up live
            ]);

            // 2. Use native fetch to call the backend stream
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    userId: "akash_077"
                })
            });
            console.log(response);

            if (!response.body) throw new Error("No response body");

            // 3. Set up the stream reader
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let isDone = false;
            let aiText = "";
            let buffer = ""; // Buffer to catch split network packets

            // 4. Read the stream loop
            while (!isDone) {
                const { value, done } = await reader.read();
                if (done) break;

                // Decode the incoming bytes into text and add to buffer
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n\n");

                // Keep the last incomplete line in the buffer
                buffer = lines.pop() || "";

                for (const line of lines) {
                    const cleanLine = line.replace(/^data:\s*/, "").trim();
                    if (!cleanLine) continue;

                    if (cleanLine === "[DONE]") {
                        isDone = true;
                        break;
                    }

                    try {
                        const parsed = JSON.parse(cleanLine);
                        if (parsed.token) {
                            aiText += parsed.token;

                            // 5. Dynamically update ONLY the very last message in the array
                            setMessages((prev) => {
                                const updatedMessages = [...prev];
                                const lastIndex = updatedMessages.length - 1;
                                updatedMessages[lastIndex] = {
                                    ...updatedMessages[lastIndex],
                                    content: aiText
                                };
                                return updatedMessages;
                            });

                            await new Promise((resolve) => setTimeout(resolve, 50));
                        }
                    } catch (e) {
                        console.error("Failed to parse chunk:", cleanLine);
                    }
                }
            }
        } catch (error) {
            console.log("Streaming error:", error);
        }
    };

    return (
        <>
            <button
                className="chat-toggle-btn"
                onClick={() => setIsopen(!isopen)}
            >
                <TbMessageChatbotFilled />
            </button>
            
                <div className={isopen ? "chat-widget open" : "chat-widget"}>
                    <div className="chat-header">
                        <div className="chat-title">
                            <div className="chat-icon">
                                {/* <TbMessageChatbotFilled /> */}
                                <img className="chat-logo" src="logo.jpeg" alt="" />
                            </div>
                            {/* <div>
                                <h3>Multiplied AI</h3>
                            </div> */}
                        </div>
                        <button onClick={() => setIsopen(false)}>X</button>
                    </div>

                    <ChatBox messages={messages} />

                    <MessageInput onSend={sendMessage} />
                </div>

        </>
    );
};

export default Chatwidget;