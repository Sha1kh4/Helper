"use client";

import { useState, useEffect } from "react";

export default function ChatInterface() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [typing, setTyping] = useState(""); // State for simulated typing effect
  const [responseWords, setResponseWords] = useState([]); // Split the response into words for the typing effect
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current word index for the typing effect

  // Simulate typing effect when the response is available
  useEffect(() => {
    if (!responseWords.length) return;

    const intervalId = setInterval(() => {
      const randomChunkSize = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Randomly between 5 and 10 words
      const nextIndex = Math.min(
        currentIndex + randomChunkSize,
        responseWords.length
      ); // Don't go out of bounds
      const newWords = responseWords.slice(currentIndex, nextIndex).join(" "); // Get the next chunk of words

      setTyping((prev) => prev + " " + newWords);
      setCurrentIndex(nextIndex); // Update the current index

      if (nextIndex === responseWords.length) {
        clearInterval(intervalId); // Stop interval when all words are typed
      }
    }, 500); // Adjust the delay for typing effect (500ms per chunk)

    return () => clearInterval(intervalId); // Cleanup the interval on unmount or when typing is done
  }, [currentIndex, responseWords]); // Dependency on currentIndex and responseWords

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setResponse(""); // Clear previous response
    setTyping(""); // Clear previous typing effect
    setResponseWords([]); // Clear previous words
    setCurrentIndex(0); // Reset word index

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (apiUrl) {
        const res = await fetch(`${apiUrl}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setResponse(data.response);
        setResponseWords(data.response.split(" ")); // Split the response into words} else {
        console.error("API URL is not defined in environment variables.");
      }
    } catch (error) {
      console.error("Error chatting with AI:", error);
    } finally {
      setLoading(false); // Stop loading once response is received
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about job opportunities..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          // Disable button while loading
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center space-x-2 text-gray-500">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-8 h-8"></div>
          <span className="text-lg">Thinking...</span>
        </div>
      )}

      {/* Typing effect */}
      {typing && !loading && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            AI Response:
          </h3>
          <p className="text-gray-700">{typing}</p>
        </div>
      )}

      {/* Final response when typing is complete */}
      {!loading && !typing && response && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            AI Response:
          </h3>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
}
