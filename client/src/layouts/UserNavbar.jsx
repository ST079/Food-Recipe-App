import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PiChefHat } from "react-icons/pi";
import { GiCookingGlove } from "react-icons/gi";
import Logo from "/logo/favicon-16x16.png";
import "../App.css";
import Profile from "/profile.png";
import { useNavigate } from "react-router-dom";
const UserNavbar = () => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user") || "Chef Name";

  const { pathname } = useLocation();
  const navigate = useNavigate();
  

 
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={Logo} className="me-2" alt="" />
            Food Recipe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === "/about" ? "active" : ""
                  } ${token ? "" : "disabled"}`}
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === "/recipes" ? "active" : ""
                  } ${token ? "" : "disabled"}`}
                  to="/recipes"
                >
                  Recipes
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === "/favourites/" ? "active" : ""
                  } ${token ? "" : "disabled"}`}
                  to="/favourites"
                >
                  Favourites
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === "/my-recipes" ? "active" : ""
                  } ${token ? "" : "disabled"}`}
                  aria-current="page"
                  to="/my-recipes"
                >
                  My Recipes
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">
                  Support
                </Link>
              </li>
            </ul>

            {/* Login and Sign Up Buttons */}
            {!token ? (
              <div className="navbar-nav mx-2">
                <Link to="/user/login">
                  <button className="btn btn-success">Login</button>
                </Link>
                {/* <Link to="/user/sign-up">
                </Link> */}
                  <button className="btn btn-danger mx-2 disabled">Sign Up</button>
              </div>
            ) : (
              ""
            )}
            {token && (
              <div className="navbar-nav">
                <button
                  className="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#profileModal"
                >
                  <PiChefHat className="fs-2 cursor-pointer" />
                </button>

                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/user/login");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* profileModal */}
      <div
        className="modal fade"
        id="profileModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="profileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="profileModalLabel">
                👩‍🍳 Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="text-center">
                <img
                  src={Profile}
                  alt="profile"
                  className="rounded-circle mb-3 w-25 h-25"
                />
                <h6>{userName}</h6>
                <p className="text-muted">Let's make the world tasty!😋</p>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <p className="text-muted">All Rights Reserved </p>{" "}
              <GiCookingGlove className="me-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
