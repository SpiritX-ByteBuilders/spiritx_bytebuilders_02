import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";

const PlayerSelection = ({ user }) => {
  const { category } = useParams();
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const resPlayers = await axios.get(
          `http://localhost:5000/api/team/players/${category}`
        );
        setPlayers(resPlayers.data);
        const resTeam = await axios.get(
          `http://localhost:5000/api/team/${user._id}`
        );
        setTeam(resTeam.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [category, user._id]);

  const addToTeam = async (player) => {
    if (team.some((p) => p._id === player._id)) {
      alert("Player already in team!");
      return;
    }
    if (team.length >= 11) {
      alert("You can only select 11 players!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/team/select", {
        userId: user._id,
        playerId: player._id,
      });
      setTeam([...team, player]);
    } catch (err) {
      alert(err.response?.data?.error || "Error adding player");
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Select {category} Players
      </Typography>
      {players.map((player) => (
        <Box key={player._id} mb={2}>
          <Typography variant="body1">
            {player.Name} ({player.University})
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToTeam(player)}
          >
            Add to Team
          </Button>
        </Box>
      ))}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/my-team")}
        sx={{ mt: 2 }}
      >
        View My Team
      </Button>
    </Container>
  );
};

export default PlayerSelection;
