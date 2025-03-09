import { useState } from "react";
import { TextField, Button, Card, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/register", {
        username,
        password,
      });
      navigate("/admin-login");
    } catch (error) {
      setError(
        `Registration failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ padding: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Admin Register
        </Typography>
        <form onSubmit={handleSubmit}>
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
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/admin-login")}
            sx={{ mt: 1 }}
          >
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default AdminRegister;
