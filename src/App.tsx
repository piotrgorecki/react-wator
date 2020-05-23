import React, { useEffect, useState, useRef, useCallback } from "react";

import "./App.css";
import { getStartingBoard, getNextBoard } from "./engine/engine";
import { Cell, Board } from "./engine/board";

const FishCell = <div className="fishCell" />;
const SharkCell = <div className="sharkCell" />;
const EmptyCell = <div className="emptyCell" />;
const CellSelector = {
  fish: FishCell,
  shark: SharkCell,
  empty: EmptyCell,
};

const BOARD_EDGE_SIZE = 80;
const NUMBER_OF_FISH = BOARD_EDGE_SIZE * 3;
const NUMBER_OF_SHARKS = BOARD_EDGE_SIZE / 2;
const INTERVAL = 200; //ms

function App() {
  const [step, setStep] = useState<number>(0);

  const boardRef = useRef<Board>();
  boardRef.current =
    boardRef.current ||
    getStartingBoard(
      BOARD_EDGE_SIZE,
      BOARD_EDGE_SIZE,
      NUMBER_OF_FISH,
      NUMBER_OF_SHARKS
    );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextBoard = getNextBoard(boardRef.current || []);
      boardRef.current = nextBoard;
      setStep((step) => step + 1);
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleReset = useCallback(() => {
    boardRef.current = getStartingBoard(
      BOARD_EDGE_SIZE,
      BOARD_EDGE_SIZE,
      NUMBER_OF_FISH,
      NUMBER_OF_SHARKS
    );
    setStep(1);
  }, []);

  return (
    <div className="App">
      <div className="board">
        {boardRef.current.map((row) => {
          return (
            <div className="row">
              {row.map((cell: Cell) => CellSelector[cell._type])}
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
