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
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Bullet</h2>
        <ul className={styles.list}>
          {players.bullet.map((player) => (
            <li key={player.id} className={styles.listItem}>
              User: {player.username}, Title: {player.title || "N/A"}, Rating:{" "}
              {player.perfs.bullet?.rating}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Blitz</h2>
        <ul className={styles.list}>
          {players.blitz.map((player) => (
            <li key={player.id} className={styles.listItem}>
              User: {player.username}, Title: {player.title || "N/A"}, Rating:{" "}
              {player.perfs.blitz?.rating}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Rapid</h2>
        <ul className={styles.list}>
          {players.rapid.map((player) => (
            <li key={player.id} className={styles.listItem}>
              User: {player.username}, Title: {player.title || "N/A"}, Rating:{" "}
              {player.perfs.rapid?.rating}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
