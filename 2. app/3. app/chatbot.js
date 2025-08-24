"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Та хүүхэд хамгааллын чиглэлээр ажилладаг нийгмийн ажилтанд зөвлөгөө өгдөг туслах." },
          { role: "user", content: input }
        ]
      })
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.choices[0].message.content };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Хүүхэд хамгааллын зөвлөх чатбот</h1>
      <div className="border p-3 h-80 overflow-y-scroll rounded">
        {messages.map((msg, i) => (
          <p key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <b>{msg.sender === "user" ? "Та" : "AI"}:</b> {msg.text}
          </p>
        ))}
      </div>
      <div className="flex mt-3">
        <input
          className="border p-2 flex-1 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Асуултаа бичнэ үү..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Илгээх
        </button>
      </div>
    </div>
  );
}
