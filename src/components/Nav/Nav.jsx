import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-items">
        <div className="nav-item" id="logo">
          <Link className="nav-link" to="/">
            Silhouette
          </Link>
        </div>

        <div className="nav-item" id="site-info">
          <p>Microfolio</p>
          <p>2017 - Ongoing</p>
        </div>
      </div>
      <div className="nav-items">
        <div className="nav-item">
          <Link className="nav-link" to="/info">
            Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
