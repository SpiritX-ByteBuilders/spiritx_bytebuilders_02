import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PlayerSelection = ({ user }) => {
  const { category } = useParams();
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const navigate = useNavigate(); // ✅ Add navigation

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/team/players/${category}`)
      .then((res) => setPlayers(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:5000/api/team/${user._id}`)
      .then((res) => setTeam(res.data))
      .catch((err) => console.error(err));
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
      setTeam([...team, player]); // ✅ Update state after adding
    } catch (err) {
      alert(err.response?.data?.error || "Error adding player");
    }
  };

  return (
    <div>
      <h1>Select {category} Players</h1>

      {players.map((player) => (
        <div key={player._id}>
          <p>
            {player.Name} ({player.University})
          </p>
          <button onClick={() => addToTeam(player)}>Add to Team</button>
        </div>
      ))}

      {/* ✅ View My Team Button */}
      <button onClick={() => navigate("/my-team")} style={{ marginTop: "20px" }}>
        View My Team
      </button>
    </div>
  );
};

export default PlayerSelection;
