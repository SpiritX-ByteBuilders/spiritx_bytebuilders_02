import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/players/${id}`); // Update API URL
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching player:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <Container>
      <Card sx={{ padding: 4, mt: 4 }}>
        <CardContent>
          <Typography variant="h4">{player.Name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{player.University}</Typography>
          <Typography variant="h6">Category: {player.Category}</Typography>
          <Typography>Total Runs: {player["Total Runs"]}</Typography>
          <Typography>Balls Faced: {player["Balls Faced"]}</Typography>
          <Typography>Innings Played: {player["Innings Played"]}</Typography>
          <Typography>Wickets: {player.Wickets}</Typography>
          <Typography>Overs Bowled: {player["Overs Bowled"]}</Typography>
          <Typography>Runs Conceded: {player["Runs Conceded"]}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PlayerProfile;
