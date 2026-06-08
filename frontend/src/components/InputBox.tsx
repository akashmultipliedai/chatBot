import { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="input-container">
      <input className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button className="send-button" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;