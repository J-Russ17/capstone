import React, { useState, FormEvent } from "react";
import axios from "axios";
import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter

interface RegisterFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter(); // Create the router instance

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://capstone-next-chess.vercel.app/api/register",
        {
          email,
          password,
        }
      );
      console.log("Registration successful:", response.data);
      router.push("/"); // Redirect to the homepage upon successful registration
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirm-password" className={styles.label}>
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirm-password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Register
      </button>
      <p className={styles.signInText}>
        Already have an account? <Link href="/api/auth/signin">Sign in</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
