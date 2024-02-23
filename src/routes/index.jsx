import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatBot from "../pages/MainFlow/ChatBot";

const RoutesIndex = () => {
  return (
    <Routes>
      {
        <>
          <Route path="/" element={<ChatBot />} />
        </>
      }
    </Routes>
  );
};

export default RoutesIndex;
