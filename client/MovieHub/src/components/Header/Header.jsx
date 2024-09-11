import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header-wrapper">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {/* TODO: найти нормальную картинку логотипа */}
          <img
            className="navbar-brand"
            src={`http://localhost:8080/static/images/MovieHub_Logo.png`}
            alt="Movie Hub Logo"
          />
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Главная
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Фильмы
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Сериалы
              </a>
            </li>
            <li className="nav-item">
              <form action="search" className="d-flex">
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
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Профиль
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
