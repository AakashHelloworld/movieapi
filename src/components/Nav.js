import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navbar">
      <Link className="link" to={`/signin`}>
        SIGNIN
      </Link>
      <Link className="link" to={`/login`}>
        LOGIN
      </Link>
    </div>
  );
};

export default Nav;
