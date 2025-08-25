import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!code.trim()) return alert("Please enter some code!");

    setLoading(true);
    setError(null);
    setReview(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code }
      );
      setReview(response.data.data);
    } catch (err) {
      alert(`Failed to fetch review. Make sure your API is running. ${err}`);
      setError("Failed to fetch review. Make sure your API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4">
      <h1 className="text-3xl font-bold text-center mb-6">AI Code Reviewer</h1>

      <div className="flex h-[80vh] gap-4">
        {/* Left Side - Input */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Code Input</h2>
          <textarea
            className="flex-1 p-4 rounded-lg bg-gray-800 font-mono text-white resize-none w-full"
            placeholder="Paste or write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            {loading ? "Reviewing..." : "Get Review"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Right Side - Output */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Code Review</h2>
          <div className="flex-1 p-4 rounded-lg bg-gray-800 overflow-auto prose max-w-full">
            {review ? (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {review}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400">Your code review will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
