import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-item" id="logo">
        <Link className="nav-link" to="/">
          Codegrid
        </Link>
      </div>
      <div className="nav-item">
        <Link className="nav-link" to="/info">
          Info
        </Link>
      </div>
    </div>
  );
};

export default Nav;
