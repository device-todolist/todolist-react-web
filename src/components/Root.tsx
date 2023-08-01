import React from "react";
import { Navigate } from "react-router-dom";

const Root: React.FC = () => {
  console.log(0);
  return <Navigate to="/login" />;
};

export default Root;
