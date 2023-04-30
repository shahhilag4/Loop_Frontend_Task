import React from 'react';
import { NavLink } from 'react-router-dom';
import "./sideBar.css"

const Sidebar = ({ bookmarkedRestaurants }) => {
  return (
    <div className="sidebar-container">
      <NavLink to="/home" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/bookmark" activeClassName="active">
        Bookmarked Restaurants
      </NavLink>
    </div>
  );
};

export default Sidebar;
