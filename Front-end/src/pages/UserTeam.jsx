import { useEffect, useState } from "react";
import axios from "axios";

const UserTeam = ({ user }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/team/${user._id}`)
      .then((res) => setTeam(res.data))
      .catch((err) => console.error(err));
  }, [user._id]);

  const removePlayer = async (playerId) => {
    try {
      await axios.post("http://localhost:5000/api/team/remove", {
        userId: user._id,
        playerId,
      });
      setTeam(team.filter((player) => player._id !== playerId));
    } catch (err) {
      alert("Error removing player");
    }
  };

  return (
    <div>
      <h1>Your Team</h1>
      {team.length === 0 ? (
        <p>No players selected</p>
      ) : (
        team.map((player) => (
          <div key={player._id}>
            <p>
              {player.name} ({player.university}) - ${player.playerValue}
            </p>
            <button onClick={() => removePlayer(player._id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserTeam;
