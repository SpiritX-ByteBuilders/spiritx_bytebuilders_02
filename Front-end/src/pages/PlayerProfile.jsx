import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/players/${id}`
        );
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching player:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  // Data for the bar charts
  const runsData = [
    { name: "Total Runs", value: player["Total Runs"] },
    { name: "Balls Faced", value: player["Balls Faced"] },
  ];

  const wicketsData = [
    { name: "Wickets", value: player.Wickets },
    { name: "Overs Bowled", value: player["Overs Bowled"] },
  ];

  return (
    <Container>
      <Card sx={{ padding: 4, mt: 4 }}>
        <CardContent>
          <Typography variant="h4">{player.Name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {player.University}
          </Typography>
          <Typography variant="h6">Category: {player.Category}</Typography>
          <Typography>Total Runs: {player["Total Runs"]}</Typography>
          <Typography>Balls Faced: {player["Balls Faced"]}</Typography>
          <Typography>Innings Played: {player["Innings Played"]}</Typography>
          <Typography>Wickets: {player.Wickets}</Typography>
          <Typography>Overs Bowled: {player["Overs Bowled"]}</Typography>
          <Typography>Runs Conceded: {player["Runs Conceded"]}</Typography>

          {/* Stats Charts */}
          <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Total Runs vs Balls Faced
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={runsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Wickets vs Overs Bowled
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wicketsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PlayerProfile;
