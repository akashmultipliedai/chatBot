import type { Message } from "../types";
import ReactMarkdown from "react-markdown";

interface ChatBoxProps {
    messages: Message[];
}

const ChatBox = ({ messages }: ChatBoxProps) => {
    return (
        <div className="chat-box">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={
                        message.role === "user"
                            ? "user-message"
                            : "assistant-message"
                    }
                >
                    {/* Fixed: role is "assistant" and content has ZERO spaces "" */}
                    {message.role === "assistant" && message.content === "" ? (
                        <div className="typing-indicator">
                            {/* Fixed: Removed the "." text from inside the spans */}
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                        </div>
                    ) : (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;