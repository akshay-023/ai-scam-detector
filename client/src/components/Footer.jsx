export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Akshay Raavi. All rights reserved.
      </p>
      <p className="footer-sub">
        Built with ❤️ using React, Node.js & MongoDB
      </p>
    </footer>
  );
}
