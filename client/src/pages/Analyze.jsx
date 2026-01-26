import { useState } from "react";

const API_BASE = "https://ai-scam-detector-api.onrender.com";

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

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const token = localStorage.getItem("token");

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
    <div style={styles.container}>
      <h1 style={styles.title}>🛡️ AI Scam Detector</h1>
      <p style={styles.subtitle}>
        Paste any job message, email, or DM to check if it’s a scam.
      </p>

      <textarea
        placeholder="Paste the suspicious message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Analyzing..." : "Analyze Text"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <div style={styles.resultBox}>
          <h2>
            Verdict:{" "}
            <span
              style={{
                color:
                  result.verdict === "SCAM"
                    ? "#ff4d4d"
                    : result.verdict === "SUSPICIOUS"
                    ? "#ffa500"
                    : "#2ecc71",
              }}
            >
              {result.verdict}
            </span>
          </h2>

          <p>
            <strong>Risk Score:</strong> {result.riskScore}/100
          </p>

          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Akshay — Built with MERN & AI
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.4rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    opacity: 0.8,
    marginBottom: "1.5rem",
  },
  textarea: {
    width: "100%",
    minHeight: "180px",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    resize: "vertical",
  },
  button: {
    marginTop: "1.2rem",
    padding: "0.9rem 1.6rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#6366f1",
    color: "#fff",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
  resultBox: {
    marginTop: "2rem",
    padding: "1.5rem",
    borderRadius: "12px",
    background: "#f9fafb",
    textAlign: "left",
  },
  footer: {
    marginTop: "3rem",
    opacity: 0.6,
    fontSize: "0.9rem",
  },
};
