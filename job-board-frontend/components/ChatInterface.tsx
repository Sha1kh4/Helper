"use client";

import { useState } from "react";

export default function ChatInterface() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error chatting with AI:", error);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about job opportunities..."
          className=" text-gray-900 w-full p-2 border rounded-md"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
      {response && (
        <div className=" text-gray-900 bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
