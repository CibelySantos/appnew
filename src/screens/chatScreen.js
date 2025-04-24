// App.jsx
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:8081");

    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  function sendMessage() {
    if (input.trim() === "") return;
    socketRef.current.emit("sendMessage", input);
    setInput("");
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>Chat Web Socket.IO</h2>
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: "5px 0", padding: 8, background: "#eee", borderRadius: 4 }}>
            {msg}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Digite sua mensagem"
          style={{ padding: 10, width: "80%" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 15px", marginLeft: 10 }}>
          Enviar
        </button>
      </div>
    </div>
  );
}
