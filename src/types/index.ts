// your types here
type Shape = "circle" | "square" | "triangle";
type Color = "red" | "green" | "blue";
type CellType = {
  id: number;
  shape: Shape;
  color: Color;
  isRevealed: boolean;
  isMatched: boolean;
};
export type { Shape, Color, CellType };
