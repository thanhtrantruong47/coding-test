import { useState, useEffect } from "react";
import "./index.css";
import Points from "../Points";
import Time from "../Time";
import Screen from "../Screen";

const Game = () => {
  const [isClear, setIsClear] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [pointsValue, setPointsValue] = useState<number | "">(""); // Manage points value
  const [displayNodes, setDisplayNodes] = useState<number>(0); // Manage the number of nodes to display

  useEffect(() => {
    let timerId = 0;

    if (isActive) {
      timerId = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 0.01);
      }, 10);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const reset = () => {
    if (typeof pointsValue === "number" && pointsValue > 0) {
      setDisplayNodes(pointsValue);
      startTimer();
      setTimeElapsed(0);
      setIsReset(true);
      setIsClear(false);
      setIsFinish(false);
      setTimeout(() => setIsReset(false), 0); // Ensure state update is applied
    } else {
      stopTimer();
      setTimeElapsed(0);
      setDisplayNodes(0);
    }
  };

  const handlePointsChange = (value: number | "") => {
    setPointsValue(value);
  };

  const handleEnter = () => {
    if (typeof pointsValue === "number" && pointsValue > 0) {
      setDisplayNodes(pointsValue);
      setTimeElapsed(0);
      setIsClear(false);
      setIsFinish(false);
      startTimer();
      setIsReset(true);
      setTimeout(() => setIsReset(false), 0);
    }
  };

  const handleError = () => {
    setIsFinish(true);
    stopTimer();
  };

  const handleClear = () => {
    setIsClear(true);
    stopTimer();
  };

  return (
    <div className="container-game">
      {isFinish ? (
        <h3 className="error">GAME OVER</h3>
      ) : isClear ? (
        <h3 className="success">ALL CLEARED</h3>
      ) : (
        <h3>LET'S PLAY</h3>
      )}
      <div className="group">
        <p>Points:</p>
        <Points
          onEnter={handleEnter}
          value={pointsValue}
          onValueChange={handlePointsChange}
        />
      </div>
      <div className="group">
        Time:
        <Time timeElapsed={timeElapsed} />
      </div>
      <button onClick={reset}>{!isActive ? "Play" : "Restart"}</button>
      <div>
        {!isReset ? (
          <Screen
            numberNode={displayNodes}
            onError={handleError}
            onClear={handleClear}
            reset={isReset}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Game;
