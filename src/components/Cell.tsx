import React from "react";
import "./Cell.css";
import { CellType } from "../types";

interface CellProps {
  cell: CellType;
  handleCellClick: (cell: CellType) => void;
}

const Cell: React.FC<CellProps> = ({ cell, handleCellClick }) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <div
      className={`cell ${cell.isRevealed ? "revealed" : ""} ${
        cell.isMatched ? "matched" : ""
      }`}
      onClick={() => handleCellClick(cell)}
    >
      {cell.isRevealed && (
        <div className={`shape ${cell.shape} ${cell.color}`} />
      )}
    </div>
  );
};

export default Cell;
