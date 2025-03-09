import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const TournamentSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tournament-summary"
        );
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching tournament summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <Container>
      <Card sx={{ padding: 4, mt: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Tournament Summary
          </Typography>
          <Typography variant="h6">
            Overall Runs: {summary.overallRuns}
          </Typography>
          <Typography variant="h6">
            Overall Wickets: {summary.overallWickets}
          </Typography>
          <Typography variant="h6">
            Highest Run Scorer: {summary.highestRunScorer}
          </Typography>
          <Typography variant="h6">
            Highest Wicket Taker: {summary.highestWicketTaker}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TournamentSummary;
