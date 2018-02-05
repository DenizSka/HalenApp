import React from "react";
import { NavLink } from "react-router-dom";
import "./css/NavBar.css";
export const NavBar = () => {
  return (
<div>
    <nav id="nav" aria-label="main navigation">
      <ul>
        <li className="active">
         <NavLink to="/" className="nav-item" activeClassName="active">
            Home
          </NavLink></li>
          <li>
          <NavLink to="/search" className="nav-item" activeClassName="active">
            Search Another Area
          </NavLink></li>
          <li>
          <NavLink to="/pastevents" className="nav-item" activeClassName="active">
            Past Events
          </NavLink>
          </li>
      </ul>
    </nav>

</div>
  );
};
