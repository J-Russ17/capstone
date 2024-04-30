"use client";
import dynamic from "next/dynamic";
import React from "react";

const PlayerVsRandomGame = dynamic(
  () => import("../../components/PlayerVsRandom"),
  {
    ssr: false,
  }
);

const PlayPage = () => {
  return (
    <div>
      <PlayerVsRandomGame />
    </div>
  );
};

export default PlayPage;
