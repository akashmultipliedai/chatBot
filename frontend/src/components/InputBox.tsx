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

  const handleKeyDown=(e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key=== "Enter"){
            e.preventDefault();
            handleSubmit();
        }
  }

  return (
    <div className="input-container">
      <input className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDownCapture={handleKeyDown}
        placeholder="Ask something..."
      />

      <button className="send-button" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;