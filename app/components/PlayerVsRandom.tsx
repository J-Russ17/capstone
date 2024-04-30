"use client";
import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import styles from "./PlayerVsRandom.module.css";

interface PlayerVsRandomProps {
  children: (props: {
    position: string;
    onDrop: (move: { sourceSquare: string; targetSquare: string }) => void;
  }) => JSX.Element;
}

const PlayerVsRandom: React.FC<PlayerVsRandomProps> = ({ children }) => {
  const [fen, setFen] = useState<string>("start");
  const game = useRef<Chess | null>(new Chess());
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = timerId.current;
    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, []);

  const makeRandomMove = () => {
    if (!game.current) return;

    let possibleMoves = game.current?.moves() || [];
    if (game.current?.isGameOver() || possibleMoves.length === 0) {
      return;
    }

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.current?.move(possibleMoves[randomIndex]);
    setFen(game.current.fen());
  };

  const handleMove = (move: { sourceSquare: string; targetSquare: string }) => {
    if (!game.current) return;

    const legalMoves = game.current.moves({ verbose: true });
    const isMoveLegal = legalMoves.some(
      (m) => m.from === move.sourceSquare && m.to === move.targetSquare
    );

    if (!isMoveLegal) {
      return;
    }

    const moveResult = game.current.move({
      from: move.sourceSquare,
      to: move.targetSquare,
      promotion: "q",
    });

    if (moveResult) {
      setFen(game.current.fen());
      setTimeout(makeRandomMove, 1000);
    }
  };

  return children({ position: fen, onDrop: handleMove });
};

export default function PlayerVsRandomGame() {
  return (
    <div className={styles.container}>
      <PlayerVsRandom>
        {({ position, onDrop }) => (
          <Chessboard
            id="playerVsRandom"
            position={position}
            onDrop={onDrop}
            transitionDuration={300}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
            }}
          />
        )}
      </PlayerVsRandom>
    </div>
  );
}
