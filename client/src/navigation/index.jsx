import React from "react";
import DashRoute from "./dashRoute";
import AuthRoute from "./authRoute";

const RootNavigation = () => {
  const user = localStorage.getItem("token");

  return <>{user ? <DashRoute /> : <AuthRoute />}</>;
};

export default RootNavigation;
