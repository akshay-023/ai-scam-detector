import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const Analyze = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const scamExample = `Hello,

We reviewed your resume and want to hire you immediately.

You must send $50 for equipment before starting work.

After payment we will ship your laptop.

Regards,
HR Team`;

  const suspiciousExample = `Hi,

We found your profile online and think you may be a fit for a remote role. Please reply with your full name, address, and availability today so we can move quickly.

Thanks,
Recruitment Team`;

  const safeExample = `Hello Akshay,

Thank you for applying to our Software Developer Intern position. We would like to schedule a 30-minute interview next week. Please choose a time from the calendar link below.

Best regards,
Hiring Team`;

  const fetchRecentScans = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = res.headers.get("content-type");
      let data = [];

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Invalid response from history API");
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch recent scans");
      }

      setRecentScans(data.slice(0, 3));
    } catch (err) {
      console.error("Recent scans error:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentScans();
  }, []);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
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

      const contentType = res.headers.get("content-type");
      let data = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Invalid response from analyze API");
      }

      if (!res.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data);
      fetchRecentScans();
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
  };

  const getVerdictStyle = (verdict) => {
    if (verdict === "SCAM") {
      return {
        backgroundColor: "rgba(255, 77, 79, 0.15)",
        color: "#ff4d4f",
        padding: "6px 12px",
        borderRadius: "999px",
        fontWeight: "bold",
        display: "inline-block",
      };
    }

    if (verdict === "SUSPICIOUS") {
      return {
        backgroundColor: "rgba(250, 173, 20, 0.15)",
        color: "#faad14",
        padding: "6px 12px",
        borderRadius: "999px",
        fontWeight: "bold",
        display: "inline-block",
      };
    }

    return {
      backgroundColor: "rgba(82, 196, 26, 0.15)",
      color: "#52c41a",
      padding: "6px 12px",
      borderRadius: "999px",
      fontWeight: "bold",
      display: "inline-block",
    };
  };

  const getShortText = (value, maxLength = 120) => {
    if (!value) return "";
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength) + "...";
  };

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "24px" }}>🛡 AI Scam Detector</h1>

      <textarea
        rows="8"
        placeholder="Paste suspicious message, email, or recruiter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "12px",
          background: "#11182c",
          color: "white",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button onClick={handleClear}>Clear</button>
      </div>

      <div
        style={{
          marginTop: "18px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setText(scamExample)}>Load Scam Example</button>
        <button onClick={() => setText(suspiciousExample)}>
          Load Suspicious Example
        </button>
        <button onClick={() => setText(safeExample)}>Load Safe Example</button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "28px",
            padding: "20px",
            borderRadius: "16px",
            background: "#11182c",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "12px" }}>Analysis Result</h2>

          <p>
            <strong>Verdict:</strong>{" "}
            <span style={getVerdictStyle(result.verdict)}>
              {result.verdict}
            </span>
          </p>

          <p style={{ marginTop: "12px" }}>
            <strong>Risk Score:</strong> {result.riskScore}
          </p>

          <h3 style={{ marginTop: "16px" }}>Reasons:</h3>
          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          marginTop: "32px",
          padding: "20px",
          borderRadius: "16px",
          background: "#11182c",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>Recent Scans</h2>

        {historyLoading && <p>Loading recent scans...</p>}

        {!historyLoading && recentScans.length === 0 && (
          <p>No recent scans available yet.</p>
        )}

        {!historyLoading &&
          recentScans.map((scan) => (
            <div
              key={scan._id}
              style={{
                padding: "14px",
                borderRadius: "12px",
                background: "#1a2238",
                marginBottom: "14px",
              }}
            >
              <p>
                <strong>Verdict:</strong>{" "}
                <span style={getVerdictStyle(scan.verdict)}>
                  {scan.verdict}
                </span>
              </p>

              <p style={{ marginTop: "8px" }}>
                <strong>Risk Score:</strong> {scan.riskScore}
              </p>

              <p style={{ marginTop: "8px" }}>
                <strong>Text:</strong> {getShortText(scan.inputText)}
              </p>

              <p style={{ marginTop: "8px", opacity: 0.8 }}>
                {new Date(scan.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Analyze;