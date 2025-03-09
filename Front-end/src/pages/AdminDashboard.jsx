// filepath: c:\Users\muham\Desktop\spiritx_bytebuilders_02\Front-end\src\pages\AdminDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleLogout}
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        Logout
      </Button>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/tournament-summary">Tournament Summary</Link>
        </li>
        {/* Add more admin-specific links here */}
      </ul>
    </div>
  );
};

export default AdminDashboard;
