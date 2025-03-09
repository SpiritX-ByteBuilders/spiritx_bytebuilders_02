import { useEffect, useState } from "react";

import { Container, Grid, Card, CardContent, Typography, CircularProgress, Button, Box } from "@mui/material";


import { useNavigate } from "react-router-dom";
import axios from "axios";

const Players = ({ onLogout }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/players"); // Update API URL
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout(null);
    navigate("/");
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <>
   <div>
      <h1>Players List</h1>
      <button onClick={() => navigate("/select-team")}>Select Your Team</button>
    </div>
    <Container>

<Typography variant="h4" gutterBottom>Available Players</Typography>

<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Button variant="contained" color="primary" onClick={() => navigate("/chatbot")}>
    Chat with Spiriter
  </Button>
  
  <Button variant="contained" color="secondary" size="small" onClick={handleLogout}>
    Logout
  </Button>
</Box>

      <Grid container spacing={3}>
        {players.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player._id}>
            <Card
              onClick={() => navigate(`/players/${player._id}`)}
              sx={{ cursor: "pointer" }}
            >
              <CardContent>
                <Typography variant="h6">{player.Name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {player.University}
                </Typography>
                <Typography variant="body2">
                  Category: {player.Category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
   
  );
};

export default Players;
