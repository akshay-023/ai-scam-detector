import { useEffect, useState } from "react";

export default function History() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/scans", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setScans(data.scans || []);
    };

    fetchScans();
  }, []);

  return (
    <>
      <div className="section-title">📜 Scan History</div>

      {scans.length === 0 && <p>No scans yet.</p>}

      {scans.map((scan) => (
        <div
          key={scan._id}
          className={`history-item ${
            scan.verdict === "SCAM" ? "scam" : "safe"
          }`}
        >
          <div className="history-text">{scan.inputText}</div>
          <b>{scan.verdict}</b> — Risk {scan.riskScore}
        </div>
      ))}
    </>
  );
}
