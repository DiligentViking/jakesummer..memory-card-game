import { useState } from "react";
import Card from "../Card/Card.jsx";
import shuffleArray from "../../utils/shuffleArray.js";
import "./CardGrid.css";

export default function CardGrid({ data }) {
  const [shuffledData, setShuffledData] = useState(data);

  const handleClick = () => {
    setShuffledData(shuffleArray(shuffledData));
  };

  return (
    <div className="card-grid">
      {shuffledData.map((d) => (
        <Card
          key={d.id}
          imgUrl={d.imgUrl}
          title={d.title}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
