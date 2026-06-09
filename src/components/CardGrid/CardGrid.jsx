import { useState } from "react";
import Card from "../Card/Card.jsx";
import shuffleArray from "../../utils/shuffleArray.js";
import "./CardGrid.css";

export default function CardGrid({ data }) {
  const [shuffledData, setShuffledData] = useState(data);
  const [clickedCardIds, setClickedCardIds] = useState([]);

  const handleClick = (cardId) => {
    setShuffledData(shuffleArray(shuffledData));
    if (clickedCardIds.includes(cardId)) {
      setClickedCardIds([]);
    } else {
      setClickedCardIds([...clickedCardIds, cardId]);
    }
  };

  return (
    <div className="card-grid">
      {shuffledData.map((d) => (
        <Card
          key={d.id}
          imgUrl={d.imgUrl}
          title={d.title}
          handleClick={() => handleClick(d.id)}
        />
      ))}
    </div>
  );
}
