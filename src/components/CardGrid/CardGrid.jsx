import { useState } from "react";
import Card from "../Card/Card.jsx";
import shuffleArray from "../../utils/shuffleArray.js";
import "./CardGrid.css";
import clickAudioMp3 from "../../assets/audio/button-click-sound-effect.mp3";

export default function CardGrid({ data, onClick, clickedCardIds }) {
  const [shuffledData, setShuffledData] = useState(data);

  const handleClick = (cardId) => {
    const clickAudio = new Audio(clickAudioMp3);
    clickAudio.play();
    setShuffledData(shuffleArray(shuffledData));
    onClick(cardId);
  };

  return (
    <div className="card-grid">
      {shuffledData.map((d) => (
        <Card
          key={d.id}
          imgUrl={d.imgUrl}
          title={d.title}
          handleClick={() => handleClick(d.id)}
          devClicked={clickedCardIds ? clickedCardIds.includes(d.id) : false}
        />
      ))}
    </div>
  );
}
