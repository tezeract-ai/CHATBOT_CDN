import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UnProtectedRoutes from "./UnProtectedRoutes";

const RoutesIndex = () => {
  return (
    <Routes>
      {
        <>
          <Route path="/" element={<UnProtectedRoutes Component={Login} />} />
        </>
      }
    </Routes>
  );
};

export default RoutesIndex;
