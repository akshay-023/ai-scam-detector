import { useState } from "react";

export default function Analyze() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data.scan || data.analysis);
  };

  return (
    <>
      <div className="section-title">🧠 Analyze Job Message</div>

      <textarea
        rows="6"
        placeholder="Paste the job message or offer here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={analyze}>Run AI Analysis</button>

      {result && (
        <div
          className={`result-card ${
            result.verdict === "SCAM" ? "scam" : ""
          }`}
        >
          <div className="verdict">Verdict: {result.verdict}</div>
          <div className="risk">Risk Score: {result.riskScore}</div>
          <ul>
            {result.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
