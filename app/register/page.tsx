"use client";
import React from "react";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  const handleSubmit = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Form data:", data);
  };

  return (
    <>
      <div>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
      <h2>Already have an account?</h2>
      <Link href="/api/auth/signin">Sign in</Link>
    </>
  );
};

export default RegisterPage;
