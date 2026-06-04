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
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};

export default ChatBox;