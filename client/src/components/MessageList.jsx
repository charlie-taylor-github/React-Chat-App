import React from "react";

const MessageList = ({ messages }) => {
    return (
        <>
            {messages.map((msg, i) => <h2 key={i}>{msg}</h2>)}
        </>
    );
}

export default MessageList;
