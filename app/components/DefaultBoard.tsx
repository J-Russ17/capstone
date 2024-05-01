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

interface GameResponse {
  id: string;
  fen: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const DefaultBoard: React.FC = () => {
  const [fen, setFen] = useState<string>("start");
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [gameId, setGameId] = useState<string>("");
  const game = useRef<Chess | null>(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  const startNewGame = async () => {
    try {
      const response = await axios.post<GameResponse>("/api/game");
      setFen(response.data.fen);
      setGameId(response.data.id); // Save the game ID to update later
      console.log("Game started:", response.data);
    } catch (error: any) {
      console.error(
        "Failed to start game:",
        error.response?.data || error.message
      );
    }
  };

  const updateGame = async (fen: string) => {
    if (!gameId) return; // Don't try to update if there's no game ID
    try {
      const response = await axios.put<GameResponse>("/api/game", {
        gameId,
        fen,
      });
      console.log("Game updated:", response.data);
    } catch (error: any) {
      console.error(
        "Failed to update game:",
        error.response?.data || error.message
      );
    }
  };

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

      const newFen = game.current.fen();
      setFen(newFen);
      updateGame(newFen); // Update game after a successful move
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
        <button onClick={startNewGame}>Start Game</button>{" "}
        {/* Start game button */}
      </div>
    </>
  );
};

export default DefaultBoard;
