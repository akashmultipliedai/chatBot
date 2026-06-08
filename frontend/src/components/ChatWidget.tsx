import { useState } from "react";
// import { FaRobot } from "react-icons/fa";

import ChatBox from "./ChatBox";
import MessageInput from "./InputBox";
import { TbMessageChatbotFilled } from "react-icons/tb";

import type { Message } from "../types";


import axios from "axios";
import { Rnd } from "react-rnd";


const Chatwidget = () => {
    const [isopen, setIsopen] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (message: string) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/chat",
                {
                    message,
                    sessionId: "akash-user"
                });
            setMessages((prev) => [
                ...prev,
                {
                    role: "user",
                    content: message
                },
                {
                    role: "assistant",
                    content: response.data.response,
                    // console.log(response),
                }
            ]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button
                className="chat-toggle-btn"
                onClick={() =>
                    setIsopen(!isopen)
                }
            >
                <TbMessageChatbotFilled />
            </button>
            {
                <div
                    className={
                        isopen
                            ? "chat-widget open"
                            : "chat-widget"
                    }
                >

                    <div className="chat-header">

                        <div className="chat-title">

                            <div className="chat-icon">

                                <TbMessageChatbotFilled />

                            </div>

                            <div>

                                <h3>Multiplied AI</h3>

                            </div>

                        </div>

                        <button
                            onClick={() => setIsopen(false)}
                        >
                            X
                        </button>

                    </div>



                    <ChatBox messages={messages} />



                    <MessageInput onSend={sendMessage} />

                </div>


            }
        </>
    )
}

export default Chatwidget;


