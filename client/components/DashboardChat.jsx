import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

const DashboardChat = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your AI mental health buddy. How are you feeling today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    if (!data.message) return;

    const userMessage = { role: "user", text: data.message };
    setMessages(prev => [...prev, userMessage]);
    reset();
    setLoading(true);

    try {
      const response = await fetch("https://sanjeevni-backend.onrender.com/patient/problemchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: data.message }),
      });

      const result = await response.json();
      const botMessage = { role: "bot", text: result.reply || "Sorry, I didn't understand that." };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("API Error:", err);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Oops! Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-h-[700px] w-full max-w-2xl mx-auto border rounded-lg shadow-lg overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`px-4 py-2 rounded-lg max-w-[70%] ${
              msg.role === "user" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-900"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex p-2 border-t">
        <input
          type="text"
          {...register("message", { required: true })}
          placeholder="Type your message..."
          className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 rounded-r-lg hover:bg-indigo-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default DashboardChat;
