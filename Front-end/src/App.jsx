import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import ChatBot from "./pages/chatbot";

import TournamentSummary from "./pages/TournamentSummary";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";


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

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Set user from local storage
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
              <Route path="/chatbot" element={user ? <ChatBot /> : <Navigate to="/" />} />


    </Routes>
  );
};

export default App;
