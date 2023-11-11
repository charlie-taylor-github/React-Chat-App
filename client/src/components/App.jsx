import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import MessageInput from "./MessageInput.jsx";
import MessageList from "./MessageList.jsx";
import ENDPOINTS from "../endpoints.js";

const socket = io.connect("http://localhost:1234");

const App = () => {
    const [messages, setMessages] = useState([]);

    socket.on("messages-update", msgs => {
        setMessages(msgs);
    })

    useEffect(() => {
        fetch(ENDPOINTS.MESSAGES)
            .then(res => res.json())
            .then(x => setMessages(x));
    }, []);

    const onSendMessage = msg => {
        socket.emit("send-message", {
            message: msg
        });
    };

    return (
        <>
            <h1>Lovely Chat App</h1>
            <MessageInput onSubmit={onSendMessage} />
            {messages.length > 0 && <MessageList messages={messages} />}
        </>
    );
};

export default App;
