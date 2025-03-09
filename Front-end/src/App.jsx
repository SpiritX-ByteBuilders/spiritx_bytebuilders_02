import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/players" /> : <Login onLogin={setUser} />} />
      <Route path="/register" element={<Register onRegister={setUser} />} />
      <Route path="/players" element={user ? <Players /> : <Navigate to="/" />} />
      <Route path="/players/:id" element={user ? <PlayerProfile /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
