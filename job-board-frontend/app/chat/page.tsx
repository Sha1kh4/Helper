"use client";

import { useState } from "react";
import { chatWithAI } from "../../utils/api";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await chatWithAI(query);
      setResponse(result.response);
    } catch (error) {
      console.error("Error chatting with AI:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Chat with Our AI Assistant</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="query" className="block mb-2">
            Your Question
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ask AI
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
