"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./leaderboards.module.css";

interface GamePerf {
  rating: number;
  progress: number;
}

interface Player {
  id: string;
  username: string;
  perfs: {
    bullet?: GamePerf;
    blitz?: GamePerf;
    rapid?: GamePerf;
  };
  title?: string;
  patron?: boolean;
  online?: boolean;
}

interface PlayerData {
  bullet: Player[];
  blitz: Player[];
  rapid: Player[];
}

const UserList = () => {
  const [players, setPlayers] = useState<PlayerData>({
    bullet: [],
    blitz: [],
    rapid: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("https://lichess.org/api/player");
        setPlayers(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className={styles.header}>LEADERBOARDS</h1>
      <div className={styles.container}>
        {["bullet", "blitz", "rapid"].map((type) => (
          <div className={styles.section} key={type}>
            <h2 className={styles.sectionTitle}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
            <ul className={styles.list}>
              {(players[type as keyof PlayerData] as Player[]).map(
                (player: Player) => (
                  <li key={player.id} className={styles.listItem}>
                    User: {player.username}, Title: {player.title || "N/A"},
                    Rating:{" "}
                    {player.perfs[type as keyof typeof player.perfs]?.rating}
                  </li>
                )
              )}
            </ul>
            <p className={styles.description}>
              {type === "bullet" &&
                "Fast-paced games with 1-2 minutes per player."}
              {type === "blitz" &&
                "Short games, typically 3-5 minutes per player."}
              {type === "rapid" &&
                "Longer games, usually 10-25 minutes per player."}
            </p>
          </div>
        ))}
      </div>
      <p className={styles.footer}>
        Top ten players in bullet, blitz, and rapid according to{" "}
        <a href="https://lichess.org">lichess.org</a>
      </p>
    </div>
  );
};

export default UserList;
