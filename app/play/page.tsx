"use client";
import Link from "next/link";
import React from "react";
import styles from "./Play.module.css";

const Play = () => {
  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.buttonWrapper}>
        <Link href="/play/computer">
          <button className={styles.button}>Play VS Computer</button>
        </Link>
      </div>
      <div className={styles.buttonWrapper}>
        <Link href="/play/friend">
          <button className={styles.button}>Play VS Friend</button>
        </Link>
      </div>
    </div>
  );
};

export default Play;
