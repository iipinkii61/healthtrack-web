"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../config/pusher";

const FormPage = () => {
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const randomName = "U-" + Math.floor(1000 + Math.random() * 9000);
    setUserId(randomName);
  }, []);

  const sendMessage = async () => {
    await fetch("/api/submit-form", {
      method: "POST",
      body: JSON.stringify({ message: text, userId }),
    });
    setText("");
  };

  const handleTyping = () => {
    const channel = pusherClient.subscribe("private-channel");
    channel.trigger("client-typing", { username: userId });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test websocket</h1>

      <div
        style={{
          marginBottom: "40px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>UserId: {userId}</p>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleTyping();
          }}
        />
        <button onClick={sendMessage}>Submit form</button>
      </div>
    </div>
  );
};

export default FormPage;
