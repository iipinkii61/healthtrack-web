"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../config/pusher";

const AdminPage = () => {
  const [incomingMessages, setIncomingMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe("private-channel");
    channel.bind("new-entry", (data: any) => {
      setIncomingMessages((prev) => [...prev, data]);
    });

    return () => pusherClient.unsubscribe("private-channel");
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe("private-channel");
    channel.bind("client-typing", (data: any) => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => pusherClient.unsubscribe("private-channel");
  }, []);

  return (
    <div style={{ border: "1px solid blue", padding: "10px" }}>
      <h3>Admin (รอรับข้อมูลแบบ Real-time)</h3>
      {isTyping && <p style={{ color: "orange" }}>มีคนกำลังพิมพ์อยู่...</p>}
      {incomingMessages.map((msg, i) => (
        <p key={i}>
          เด้งมาใหม่: {msg.message} <sub>{msg.time}</sub>
        </p>
      ))}
    </div>
  );
};

export default AdminPage;
