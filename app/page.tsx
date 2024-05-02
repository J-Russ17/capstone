import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center ">
        <h1 className="text-4xl font-bold mb-4 text-yellow-400 border border-white rounded bg-black p-4">
          Welcome to Next Chess
        </h1>
        <p className="text-lg text-white">
          Your Ultimate Destination for Chess Enthusiasts!
        </p>
      </div>
      <div className="mt-8 ">
        <h2 className="text-2xl font-bold mb-2 text-yellow-400 border border-white rounded bg-black p-4">
          Key Features
        </h2>
        <ul className="list-disc text-white pl-5">
          <li className="text-lg">Play against the computer</li>
          <li className="text-lg">Play against a friend</li>
          <li className="text-lg">View top-ranked players</li>
        </ul>
      </div>
      <div className="mt-8 w-full flex justify-center">
        <div className="text-center w-auto">
          <h2 className="text-2xl font-bold mb-2 text-yellow-400 border border-white rounded bg-black p-4">
            About Us
          </h2>
          <p className="text-lg text-white">
            ChessMaster was born out of a deep love for chess as a game. Like
            many puzzle enthusiasts, our journey began with games like the
            Rubik&apos;s Cube, and when we started programming, creating a chess
            game was a natural next step. We are passionate about providing a
            platform for chess enthusiasts to play, learn, and connect.
          </p>
        </div>
      </div>
      <Link href="/register">
        <button className="mt-8 bg-black text-yellow-400 border border-yellow-400 rounded-lg py-4 px-6 text-xl font-bold uppercase cursor-pointer">
          Register
        </button>
      </Link>
    </div>
  );
};

export default Home;
