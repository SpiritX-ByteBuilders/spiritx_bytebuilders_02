// filepath: c:\Users\muham\Desktop\spiritx_bytebuilders_02\Front-end\src\pages\AdminDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Card, Box } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <ul>
        <li>
          <Link to="/players">Players</Link>
        </li>
        <li>
          <Link to="/tournament-summary">Tournament Summary</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
