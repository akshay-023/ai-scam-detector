export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <p style={styles.text}>
          © {new Date().getFullYear()}{" "}
          <strong>Akshay</strong> — AI Scam Detector
        </p>

        <p style={styles.subtext}>
          Built with MERN • AI-powered analysis • Deployed on Render
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "4rem",
    padding: "1.5rem 1rem",
    borderTop: "1px solid #e5e7eb",
    textAlign: "center",
    background: "linear-gradient(to right, #f9fafb, #ffffff)",
  },
  inner: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  text: {
    fontSize: "0.95rem",
    color: "#111827",
  },
  subtext: {
    marginTop: "0.4rem",
    fontSize: "0.8rem",
    color: "#6b7280",
  },
};
