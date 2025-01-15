import React from "react";
import "./header.css";
import logo from "./logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`header-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="header">
        <img src={logo} alt="logo" className="header-logo" />

        <div className="side-icons">
          <div className="dark-light-toggle" onClick={toggleDarkMode}>
            <FontAwesomeIcon
              icon={isDarkMode ? faToggleOn : faToggleOff}
              size="lg"
            />
          </div>
          <div className="theme-text">{isDarkMode ? "Dark" : "Light"}</div>
          <div className="logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
