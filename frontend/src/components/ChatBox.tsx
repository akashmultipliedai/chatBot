import type { Message } from "../types";

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
                    {message.content}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;