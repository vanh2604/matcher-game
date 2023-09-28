import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import styles from "./Board.module.css";
import { CellType, Shape, Color } from "../types";

const Board: React.FC = () => {
  // states...
  const [cells, setCells] = useState<CellType[]>([]);
  const [selectedCells, setSelectedCells] = useState<CellType[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isGameComplete, setGameComplete] = useState(false);

  console.log("cells", cells);

  useEffect(() => {
    // Initialize the game board with random shapes and colors
    generateCells();
  }, []);
  const generateCells = () => {
    const shapes: Shape[] = ["circle", "square", "triangle"];
    const colors: Color[] = ["red", "green", "blue"];
    const cellPairs: CellType[] = [];

    for (let i = 0; i < 8; i++) {
      const shape = shapes[i % 3];
      const color = colors[i % 3];

      cellPairs.push(
        { id: i * 2, shape, color, isRevealed: false, isMatched: false },
        { id: i * 2 + 1, shape, color, isRevealed: false, isMatched: false }
      );
    }

    const shuffledCells = cellPairs.sort(() => Math.random() - 0.5);
    setCells(shuffledCells);
  };

  const checkMatch = (cellPairs: CellType[]) => {
    console.log("cellpair", cellPairs);
    const [firstCell, secondCell] = cellPairs;

    if (
      firstCell.shape === secondCell.shape &&
      firstCell.color === secondCell.color
    ) {
      const updatedCells = cells.map((cell) => {
        if (cell.id === firstCell.id || cell.id === secondCell.id) {
          console.log("celll", cell);
          return { ...cell, isMatched: true, isRevealed: true };
        } else {
          return cell;
        }
        // cell.id === firstCell.id || cell.id === secondCell.id
        //   ? { ...cell, isMatched: true }
        //   : cell
      });
      console.log("updated cells", updatedCells);
      setCells(updatedCells);
      setSelectedCells([]);

      if (updatedCells.every((cell) => cell.isMatched)) {
        handleGameComplete();
      }
    } else {
      hideUnmatchedCells(cellPairs);
    }
  };

  const hideUnmatchedCells = (cellpairs: CellType[]) => {
    const [firstCell, secondCell] = cellpairs;

    const updatedCells = cells.map((cell) => {
      if (cell.id === firstCell.id || cell.id === secondCell.id) {
        return { ...cell, isRevealed: false };
      }
      return cell;
    });

    setSelectedCells([]);
    setCells(updatedCells);
  };

  const handleGameComplete = () => {
    setGameComplete(true);
  };
  // const handleCellClick = (index: number) => {
  //   // Reveal cell, check for matches, update game state, and handle game completion

  // };
  const handleCellClick = (clickedCell: CellType) => {
    if (selectedCells.length === 2) return;

    if (!clickedCell.isRevealed && !clickedCell.isMatched) {
      const updatedCells = cells.map((cell) =>
        cell.id === clickedCell.id ? { ...cell, isRevealed: true } : cell
      );
      setCells(updatedCells);

      const updatedSelectedCells = [...selectedCells, clickedCell];
      setSelectedCells([...updatedSelectedCells]);

      if (updatedSelectedCells.length === 2) {
        setAttempts(attempts + 1);
        console.log("updated cell", updatedSelectedCells);
        setTimeout(() => checkMatch(updatedSelectedCells), 1000);
      }
    }
  };

  return (
    <>
      <div className={styles.board}>
        {cells.map((cell) => (
          <Cell key={cell.id} cell={cell} handleCellClick={handleCellClick} />
        ))}
      </div>
      {isGameComplete && (
        <div className={styles.completion}>
          Game Complete! Attempts: {attempts}
        </div>
      )}
    </>
  );
};

export default Board;
