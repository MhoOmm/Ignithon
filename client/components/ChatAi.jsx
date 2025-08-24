// ChatAi.jsx
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatAi = () => {
  const [messages, setMessages] = useState([
    { role: "model", parts: [{ text: "Hi! How are you feeling today?" }] },
  ]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message handler
  const onSubmit = async (data) => {
    if (!data.message) return;

    const newMessage = { role: "user", parts: [{ text: data.message }] };
    setMessages(prev => [...prev, newMessage]);
    reset();
    setLoading(true);

    try {
      // Call backend API with single message string
      const response = await axios.post(
        "http://localhost:4000/patient/mindcare",
        { message: data.message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      // Add AI reply to messages
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response.data.message || "No response from server" }],
        },
      ]);
    } catch (error) {
      console.error("API Error", error);
      setMessages(prev => [
        ...prev,
        { role: "model", parts: [{ text: "I encountered an error. Please try again." }] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] border rounded-lg shadow-lg">
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-[70%] ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-gray-200 text-black">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex p-2 gap-2 border-t bg-white">
        <input
          {...register("message", { required: true, minLength: 1, maxLength: 200 })}
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </form>

      {/* Validation Error */}
      {errors.message && (
        <p className="text-red-500 text-sm mt-1 px-2">
          Message must be between 1 and 200 characters.
        </p>
      )}
    </div>
  );
};

export default ChatAi;
