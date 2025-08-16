import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <div className="container">
      <UserNavbar />
      <main className="min-vh-100">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
