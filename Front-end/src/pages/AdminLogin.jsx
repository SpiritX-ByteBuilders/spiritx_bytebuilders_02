import { useState } from "react";
import { TextField, Button, Card, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("adminToken", response.data.token); // Store token
      onLogin(response.data.token);
      navigate("/admin-dashboard");
    } catch (error) {
      setError(
        `Login failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ padding: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/admin-register">Register here</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          User? <Link to="/">Login here</Link>
        </Typography>
      </Card>
    </Container>
  );
};

export default AdminLogin;
