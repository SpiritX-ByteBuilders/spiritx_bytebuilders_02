import { useState } from "react";
import { TextField, Button, Card, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register", 
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("token", response.data.token); // Save token
      onRegister(response.data.token); // Update state
      navigate("/players"); // Redirect to players page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ padding: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
            have an account?
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => navigate("/")}
          sx={{ mt: 1 }}
        >
          Log In
        </Button>
      </Card>
    </Container>
  );
};

export default Register;
