import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const History = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
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
          throw new Error(data.message || "Failed to fetch history");
        }

        setScans(data);
      } catch (err) {
        console.error("History error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

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

  const toggleExpanded = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getPreviewText = (text, isExpanded, maxLength = 180) => {
    if (isExpanded || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "24px" }}>📜 Scan History</h1>

      {loading && <p>Loading history...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && scans.length === 0 && (
        <div
          style={{
            background: "#11182c",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <p style={{ margin: 0 }}>No scan history found yet.</p>
        </div>
      )}

      {!loading &&
        !error &&
        scans.map((scan) => {
          const isExpanded = !!expandedCards[scan._id];
          const needsToggle = scan.inputText.length > 180;

          return (
            <div
              key={scan._id}
              style={{
                background: "#11182c",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "20px",
                color: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <strong>Verdict:</strong>{" "}
                  <span style={getVerdictStyle(scan.verdict)}>
                    {scan.verdict}
                  </span>
                </div>

                <div style={{ opacity: 0.8, fontSize: "14px" }}>
                  {new Date(scan.createdAt).toLocaleString()}
                </div>
              </div>

              <p style={{ marginBottom: "10px" }}>
                <strong>Risk Score:</strong> {scan.riskScore}
              </p>

              <p style={{ marginBottom: "8px" }}>
                <strong>Input Text:</strong>
              </p>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#1a2238",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  lineHeight: "1.6",
                }}
              >
                {getPreviewText(scan.inputText, isExpanded)}
              </div>

              {needsToggle && (
                <button
                  type="button"
                  onClick={() => toggleExpanded(scan._id)}
                  style={{ marginBottom: "14px" }}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}

              <p style={{ marginBottom: "8px" }}>
                <strong>Reasons:</strong>
              </p>

              <ul style={{ marginTop: 0, paddingLeft: "20px" }}>
                {scan.reasons.map((reason, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default History;