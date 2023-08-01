import { Navigate } from "react-router-dom";
import React from "react";

const ErrorPage: React.FC = () => {
  console.log(1);
  return <Navigate replace to="/login" />;
};

export default ErrorPage;
