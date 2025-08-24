import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatAi = ({ problem }) => {
  const [messages, setMessages] = useState([
    { role: "model", parts: [{ text: "Hi, How are you?" }] },
  ]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    if (!data.message) return;

    const newMessage = { role: "user", parts: [{ text: data.message }] };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    reset();
    setLoading(true);

    try {
      // Extract only text messages
      const messageTexts = updatedMessages.map(msg => msg.parts[0].text);

      const response = await axios.post(
        "http://localhost:4000/patient/mindcare",
        { messages: messageTexts }, // only text array
        {
          withCredentials: true,
          headers: { 'Content-Type': "application/json" }
        }
      );

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
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
            <div className="chat-bubble bg-base-200 text-base-content">
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-base-200 text-base-content">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="form-control p-2 flex items-center gap-2">
        <input
          {...register("message", { maxLength: 200, minLength: 1, required: true })}
          className="flex-grow input input-bordered"
          placeholder="Type your message..."
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>

      {/* Validation Error */}
      {errors.message && (
        <p className="text-red-500 text-sm mt-1">
          Message must be between 1 and 200 characters.
        </p>
      )}
    </div>
  );
};

export default ChatAi;
