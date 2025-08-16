import React from "react";
import { Link } from "react-router-dom";
import Logo from "/logo/favicon-16x16.png";
const UserNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="#">
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/recipes">
                  Recipes
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/favourites">
                  Favourites
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">
                  Support
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            <div className="navbar-nav mx-2">
              <button className="btn btn-success">Login</button>

              <button className="btn btn-danger mx-2">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
