import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import SelectTeam from "./pages/SelectTeam";
import PlayerSelection from "./pages/PlayerSelection";
import UserTeam from "./pages/UserTeam";

const App = () => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Set user from local storage
    }
  }, []);
//hello
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/players" /> : <Login onLogin={setUser} />} />
      <Route path="/register" element={<Register onRegister={setUser} />} />
      <Route path="/players" element={user ? <Players /> : <Navigate to="/" />} />
      <Route path="/players/:id" element={user ? <PlayerProfile /> : <Navigate to="/" />} />
      <Route path="/select-team" element={user ? <SelectTeam /> : <Navigate to="/" />} />
      <Route path="/select-team/:category" element={user ? <PlayerSelection user={user} /> : <Navigate to="/" />} />
      <Route path="/my-team" element={user ? <UserTeam user={user} /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
