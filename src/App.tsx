import React, { useEffect, useState, useRef, useCallback } from "react";

import Engine, { getSimpleBoard } from "wator-engine";

import "./App.css";

const EmptyCell = <div className="emptyCell" />;
const FishCell = <div className="fishCell" />;
const SharkCell = <div className="sharkCell" />;
const CellSelector = [EmptyCell, FishCell, SharkCell];

const INTERVAL = 100; //ms

const getNewEngine = () =>
  new Engine([100, 100], 3, 61, {
    fish: {
      breedTime: 8,
    },
    shark: {
      startingEnergy: 68,
      breedEnergy: 84,
      energyBonus: 59,
    },
  });

function App() {
  const [step, setStep] = useState<number>(0);

  const engine = useRef<Engine>();
  engine.current = engine.current || getNewEngine();

  const computeNextState = useCallback(() => {
    if (engine?.current) {
      engine.current.nextState();
      setStep((step: number) => step + 1);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(computeNextState, INTERVAL);
    return () => clearInterval(intervalId);
  }, [computeNextState]);

  const handleReset = useCallback(() => {
    engine.current = getNewEngine();
    setStep(1);
  }, []);

  const simpleBoard = getSimpleBoard(engine.current.board);

  return (
    <div className="App">
      <div className="board">
        {simpleBoard.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((cell: number) => CellSelector[cell])}
            </div>
          );
        })}
      </div>
      <div className="sideMenu">
        <h2>Wator</h2>
        <button type="reset" className="resetButton" onClick={handleReset}>
          Reset
        </button>
        <p>step: {step}</p>
      </div>
    </div>
  );
}

export default App;
