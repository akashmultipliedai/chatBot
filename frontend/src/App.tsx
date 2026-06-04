import { useState } from "react";
import axios from "axios";

import ChatBox from "./components/ChatBox";
import MessageInput from "./components/InputBox";
import type { Message } from "./types";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (message: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/chat",
        {
          message
        }
      );

      setMessages(response.data.conversation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>AI Chat</h1>
      <div className="chat-container">
        <ChatBox messages={messages} />
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default App;