import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Analyze from "./pages/Analyze";
import History from "./pages/History";

/**
 * Protect routes that require authentication
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {/* Top Navigation */}
        <Navbar />

        {/* Routes */}
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/analyze" replace />} />

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/analyze"
            element={
              <ProtectedRoute>
                <Analyze />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/analyze" replace />} />
        </Routes>

        {/* Footer with your name & copyright */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
