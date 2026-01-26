import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Analyze() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please login again.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "2rem" }}>
      <h1>🛡️ AI Scam Detector</h1>

      <textarea
        rows="6"
        placeholder="Paste suspicious message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "1rem", marginTop: "1rem" }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginTop: "1rem", padding: "0.7rem 1.5rem" }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "1.5rem" }}>
          <p><strong>Verdict:</strong> {result.verdict}</p>
          <p><strong>Risk Score:</strong> {result.riskScore}</p>
          <ul>
            {result.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
