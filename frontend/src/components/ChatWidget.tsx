import { useState } from "react";

import ChatBox from "./ChatBox";
import MessageInput from "./InputBox";

import type { Message } from "../types";


import axios from "axios";


const Chatwidget = () => {
    const [isopen, setIsopen] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage= async (message:string)=>{
        try{
            const response = await axios.post(
                "http://localhost:3000/chat",
            {
                message,
                sessionId:"akash-user"
            });
            setMessages((prev) =>[
                ...prev,
                {
                    role:"user",
                    content:message
                },
                {
                    role:"assistant",
                    content:response.data.response,
                    // console.log(response),
                }
            ]);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <button
                className="chhat-toggle-btn"
                onClick={() =>
                    setIsopen(!isopen)
                }
            >
                AI

            </button>
            {
                isopen && (
                    <div className="chat-widget">
                        <div className="chat-header">
                            <h3>AI Chat</h3>
                            <button onClick={
                                ()=> setIsopen(false)
                            }>X</button>

                        </div>

                        <ChatBox messages={messages} />
                        <MessageInput onSend={sendMessage} />
                    </div>
                )
            }
        </>
    )
}

export default Chatwidget;


