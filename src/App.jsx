import { useEffect, useState } from "react";
import "./App.css";
import fetchData from "./fetchData.js";

function App() {
  const [apiStatus, setApiStatus] = useState({
    data: [],
    isLoading: false,
    error: false,
  });

  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      try {
        setApiStatus((prev) => ({ ...prev, isLoading: true }));
        const fetchedData = await fetchData();
        if (!ignore) {
          setApiStatus((prev) => ({ ...prev, data: fetchedData }));
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

  console.log(apiStatus);
}

export default App;
