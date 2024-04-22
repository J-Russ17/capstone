"use client";
import React from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  const handleSubmit = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Form data:", data);
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
