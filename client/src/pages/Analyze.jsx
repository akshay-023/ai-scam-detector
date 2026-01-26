import { useState } from "react";

export default function Analyze() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeText = async () => {
    setError("");
    setResult(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="analyze-container">
      <h2>AI Scam Detector</h2>

      <textarea
        rows="6"
        placeholder="Paste suspicious message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={analyzeText}>Analyze Text</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="result">
          <p><strong>Verdict:</strong> {result.verdict}</p>
          <p><strong>Risk Score:</strong> {result.riskScore}</p>
        </div>
      )}
    </div>
  );
}
