"use client";
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2024 Chess Web App. All rights reserved.</p>
        <p>
          Check out the project on{" "}
          <a
            href="https://github.com/J-Russ17/capstone.git"
            className={styles.link}
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
