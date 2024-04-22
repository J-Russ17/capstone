"use client";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";

import React from "react";

const Stockfish = () => {
  const chess = new Chess();

  while (!chess.isGameOver()) {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
  }
  console.log(chess.pgn());
  return (
    <div className="chess-board">
      <Chessboard position="start" />
    </div>
  );
};

export default Stockfish;
