import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../header";

import "./layout.css";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
};
