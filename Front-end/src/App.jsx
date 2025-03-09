import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import ChatBot from "./pages/ChatBot";
import TournamentSummary from "./pages/TournamentSummary";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import SelectTeam from "./pages/SelectTeam"; // Import the SelectTeam component
import PlayerSelection from "./pages/PlayerSelection"; // Import the PlayerSelection component

const App = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    } else {
      setUser(null);
    }
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setAdmin(adminToken);
    } else {
      setAdmin(null);
    }
  }, []);

  return (
    <Routes>
      {/* User Routes */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/players" /> : <Login onLogin={setUser} />
        }
      />
      <Route path="/register" element={<Register onRegister={setUser} />} />
      <Route
        path="/players"
        element={
          user || admin ? <Players onLogout={setUser} /> : <Navigate to="/" />
        }
      />
      <Route
        path="/players/:id"
        element={user || admin ? <PlayerProfile /> : <Navigate to="/" />}
      />
      <Route path="/select-team" element={<SelectTeam />} />{" "}
      {/* Add the SelectTeam route */}
      <Route
        path="/select-team/:category"
        element={<PlayerSelection user={user} />}
      />{" "}
      {/* Add the PlayerSelection route */}
      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin onLogin={setAdmin} />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route
        path="/admin-dashboard"
        element={admin ? <AdminDashboard /> : <Navigate to="/admin-login" />}
      />
      <Route
        path="/tournament-summary"
        element={admin ? <TournamentSummary /> : <Navigate to="/admin-login" />}
      />
      <Route
        path="/chatbot"
        element={user ? <ChatBot /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
