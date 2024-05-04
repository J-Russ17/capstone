import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold mb-6 text-yellow-500">
          Welcome to Next Chess
        </h1>
        <p className="text-xl">
          Your Ultimate Destination for Chess Enthusiasts!
        </p>
      </div>
      <div className="flex flex-wrap justify-between items-stretch w-full max-w-4xl mx-auto my-8 gap-8">
        <div
          className="flex-1 flex flex-col p-4 border-2 border-black rounded-lg bg-black"
          style={{ minHeight: "300px" }}
        >
          <div className="mb-auto w-full text-center">
            <h2 className="text-5xl font-bold mb-4 text-yellow-500">
              Key Features
            </h2>
            <ul
              className="list-disc space-y-4 text-2xl text-center"
              style={{ paddingInlineStart: "40px", margin: 0 }}
            >
              <li style={{ textAlign: "left" }}>
                Play chess against the computer
              </li>
              <li style={{ textAlign: "left" }}>Play chess against a friend</li>
              <li style={{ textAlign: "left" }}>
                View lichess.org top ten ranked players globally in bullet,
                blitz, and rapid time controls
              </li>
            </ul>
          </div>
        </div>
        <div
          className="flex-1 flex flex-col justify-center items-center p-4 border-2 border-black rounded-lg bg-black"
          style={{ minHeight: "300px" }}
        >
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-4 text-yellow-500">
              What is Next Chess?
            </h2>
            <p className="text-lg">
              Next Chess is a fun and simple chess application that allows a
              user to play chess against the computer or against a friend. I
              fell in love with chess the first time I played. When I started
              programming the first thing I wanted to do was make my own chess
              game. I called it Next Chess because I used Next.js to make it...
              creative right? As my first full stack project I feel proud of it
              and I plan to keep working on it as a side project so stay tuned
              for future updates and improvements!
            </p>
          </div>
        </div>
      </div>
      <Link href="/register">
        <button className="bg-black hover:bg-yellow-500 hover:text-black text-yellow-500 border border-yellow-500 rounded-lg py-3 px-6 text-xl font-bold uppercase transition-colors duration-300 cursor-pointer">
          Register
        </button>
      </Link>
    </div>
  );
};

export default Home;
