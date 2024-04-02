import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();
  const toggleExpansion = () => {
    if (localStorage.getItem("UserType") === "Leader") {
      navigate("AddProject");
    } else {
      navigate("Contact");
    }
  };

  return (
    <div className="fixed  rounded-full bottom-4 right-4">
      <button
        onClick={toggleExpansion}
        className="h-[80px] w-[80px] bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full flex items-center justify-center flex items-center shadow-inset-xl text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="7" x2="12" y2="17"></line>
          <line x1="7" y1="12" x2="17" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default FloatingButton;
