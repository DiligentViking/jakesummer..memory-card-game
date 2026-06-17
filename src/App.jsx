import { useEffect, useState } from "react";
import "./App.css";
import fetchData from "./services/fetchData.js";
import shuffleArray from "./utils/shuffleArray.js";
import Loading from "./components/Loading/Loading.jsx";
import CardGrid from "./components/CardGrid/CardGrid.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  const [apiStatus, setApiStatus] = useState({
    data: [],
    isLoading: false,
    error: false,
  });
  const [clickedCardIds, setClickedCardIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const score = clickedCardIds.length;

  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      try {
        setApiStatus((prev) => ({ ...prev, isLoading: true }));
        const fetchedData = await fetchData();
        if (!ignore) {
          setApiStatus((prev) => ({
            ...prev,
            data: shuffleArray(fetchedData),
          }));
        }
      } catch (error) {
        if (!ignore) {
          setApiStatus((prev) => ({ ...prev, error: error }));
        }
      } finally {
        if (!ignore) {
          setApiStatus((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    startFetching();

    return () => (ignore = true);
  }, []);

  const onCardClick = (cardId) => {
    if (clickedCardIds.includes(cardId)) {
      setClickedCardIds([]);
    } else {
      setClickedCardIds([...clickedCardIds, cardId]);

      if (score + 1 > bestScore) setBestScore(score + 1);
    }
  };

  return (
    <>
      {apiStatus.isLoading && <Loading />}
      {apiStatus.data.length > 0 && (
        <>
          <Header score={score} bestScore={bestScore} />
          <CardGrid data={apiStatus.data} onClick={onCardClick} />
        </>
      )}
    </>
  );
}

export default App;
