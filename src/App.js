import React, { useState, useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import TaskInput from "./components/TaskInput";
import TaskListIncomplete from "./components/TaskListIncomplete";
import TaskListComplete from "./components/TaskListComplete";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/footer";
import "./App.css";

//HANDLING LOGIN FUNCTIONALITY IN MAIN APP ITSELF (also for global dark mode)
//LOGIN FUNCTIONALITY UNDER DEV

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("darkMode", !isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(storedDarkMode);
    document.body.classList.toggle("dark-mode", storedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   if (username.trim()) {
  //     setIsLoggedIn(true);
  //     localStorage.setItem("username", username);
  //   }
  //   setIsLoggedIn(true);
  // };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   if (username.trim()) {
  //     setIsLoggedIn(true);
  //     localStorage.setItem("username", username);
  //   }
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUsername("");
  //   // localStorage.removeItem("username");
  // };

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username");
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`main ${isDarkMode ? "dark" : "light"}`}>
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

          <div className="central-app-components">
            <div className="task-components">
              <div className="input-component">
                <TaskInput />
              </div>
              <div className="incomplete-list-component">
                <TaskListIncomplete />
              </div>
              <div className="complete-list-component">
                <TaskListComplete />
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
