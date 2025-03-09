import { useNavigate } from "react-router-dom";

const SelectTeam = () => {
  const navigate = useNavigate();

  const categories = ["Batsman", "Bowler", "All-Rounder"];

  return (
    <div>
      <h1>Select Player Category</h1>
      {categories.map((category) => (
        <button key={category} onClick={() => navigate(`/select-team/${category}`)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default SelectTeam;
