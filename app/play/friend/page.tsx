"use client";
import dynamic from "next/dynamic";
import React from "react";

const DefaultBoard = dynamic(() => import("@/app/components/DefaultBoard"), {
  ssr: false,
});

const FriendPage = () => {
  return (
    <div>
      <DefaultBoard />
    </div>
  );
};

export default FriendPage;
