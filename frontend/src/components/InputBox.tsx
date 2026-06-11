import { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSend, disabled = false }: MessageInputProps) => {
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
        placeholder={disabled ? "Waiting for response..." : "Ask something..."}
        disabled={disabled}
      />

      <button className="send-button" onClick={handleSubmit} disabled={disabled}>
        {disabled ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default MessageInput;