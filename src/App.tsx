/* eslint-disable no-alert */
import { useState } from "react";

import Grid from "./components/Grid";
import "./app.css";

function App() {
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState<number>(0);

  const updateScore = (winner: string) => {
    if (winner === "firstPlayer") {
      setFirstPlayerScore(prev => prev + 1);
      alert("First Player won!");
    }
    else {
      setSecondPlayerScore(prev => prev + 1);
      alert("Second Player won!");
    }
  };

  return (
    <div className="container">
      <Grid updateScore={updateScore} />

      <div className="scoreboard">

        <h4>
          First Player Score:
          {firstPlayerScore}
        </h4>
        <h4>
          Second Player Score:
          {secondPlayerScore}
        </h4>
      </div>
    </div>
  );
}

export default App;
