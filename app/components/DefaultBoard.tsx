"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import styles from "./DefaultBoard.module.css";
import axios from "axios";

interface DropResults {
  sourceSquare: string;
  targetSquare: string;
}

const DefaultBoard: React.FC = () => {
  const [fen, setFen] = useState<string>("start");
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const game = useRef<Chess | null>(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }: DropResults) => {
    if (!game.current) {
      console.error("Game not initialized");
      return "snapback";
    }

    const legalMoves = game.current.moves({ verbose: true });
    const isMoveLegal = legalMoves.some(
      (move) =>
        move.from === sourceSquare &&
        move.to === targetSquare &&
        (move.promotion === "q" || !move.promotion)
    );

    if (!isMoveLegal) {
      return "snapback";
    }

    try {
      const move = game.current.move({
        from: sourceSquare,
        to: targetSquare,
        promotion:
          targetSquare[1] === "1" || targetSquare[1] === "8" ? "q" : undefined,
      });

      if (!move) {
        return "snapback";
      }

      setFen(game.current.fen());
      console.log(move);
    } catch (error) {
      console.error("Failed to make move:", error);
      return "snapback";
    }

    if (orientation === "white") {
      setOrientation("black");
    } else {
      setOrientation("white");
    }
  };

  const startNewGame = async () => {
    try {
      const response = await axios.post("/api/game", { fen });
      console.log("Game started:", response.data);
    } catch (error: any) {
      console.error(
        "Failed to start game:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className="chess-board">
          <Chessboard
            position={fen}
            onDrop={onDrop}
            dropOffBoard="snapback"
            orientation={orientation}
          />
        </div>
      </div>
    </>
  );
};

export default DefaultBoard;
