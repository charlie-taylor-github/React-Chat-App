import React, { useState } from "react";

const MessageInput = ({ onSubmit }) => {
    const [msg, setMsg] = useState("");

    const onClick = () => {
        onSubmit(msg);
        setMsg("");
    };

    return (
        <>
            <input
                onChange={e => setMsg(e.target.value)}
                value={msg}
            />
            <button onClick={onClick}>go</button>
        </>
    );
}

export default MessageInput;
