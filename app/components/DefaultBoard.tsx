"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import styles from "./DefaultBoard.module.css";

interface DropResults {
  sourceSquare: string;
  targetSquare: string;
}

const DefaultBoard: React.FC = () => {
  const [fen, setFen] = useState<string>("start");
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [checkmate, setCheckmate] = useState<boolean>(false);
  const [moveCount, setMoveCount] = useState<number>(0);
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

    setMoveCount(moveCount + 1);

    const isCheckmate = game.current?.isGameOver();

    if (isCheckmate) return setCheckmate(true);

    if (orientation === "white") {
      setOrientation("black");
    } else {
      setOrientation("white");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.layout}>
          {moveCount === 0 && (
            <div className={styles.leftText}>
              <p>
                This game mode is meant to be played with a friend in person.
                Whenever a move is made the board will flip orientation so that
                whoever&apos;s turn it is gets to see the board from their
                piece&apos;s point of view. Make a move to initiate the game,
                white goes first!
              </p>
            </div>
          )}

          <div className={styles.boardCenter}>
            <div className={styles.statusText}>
              {checkmate && <p>CHECKMATE!</p>}
            </div>

            <div className="chess-board">
              <Chessboard
                position={fen}
                onDrop={onDrop}
                dropOffBoard="snapback"
                orientation={orientation}
              />
            </div>

            <div className={styles.statusText}>
              {checkmate && <p>{orientation.toUpperCase()} WINS!</p>}
            </div>
          </div>

          {moveCount === 0 && (
            <div className={styles.rightText}>
              <p>Good luck have fun!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DefaultBoard;
