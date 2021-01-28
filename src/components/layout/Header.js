import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            Bookstore (Jotai)
          </a>
        </div>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink to="/book" className="nav-link" activeClassName="active">
              Books
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category" className="nav-link" activeClassName="active">
              Categories
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/publisher" className="nav-link" activeClassName="active">
              Publishers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/author" className="nav-link" activeClassName="active">
              Authors
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
