import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component

const Layout = () => {
  return (
    <>
      <Navbar />  {/* Navbar will always be visible */}
      <Outlet />  {/* This will render different pages dynamically */}
    </>
  );
};

export default Layout;
