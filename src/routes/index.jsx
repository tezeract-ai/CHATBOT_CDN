import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UnProtectedRoutes from "./UnProtectedRoutes";
import SignIn from "../pages/AuthFlow/SignIn";

const RoutesIndex = () => {
  return (
    <Routes>
      {
        <>
          <Route path="/" element={<UnProtectedRoutes Component={SignIn} />} />
        </>
      }
    </Routes>
  );
};

export default RoutesIndex;
