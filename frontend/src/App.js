import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Notes from "./components/Note";
import "./App.css";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      setIsAuthenticated(true);
    }
  }, []);
  const handleAuthChange = (status) => setIsAuthenticated(status);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Notes
          onLogout={() => {
            localStorage.removeItem("token");
            handleAuthChange(false);
          }}
        />
      ) : (
        <Auth onAuthSuccess={() => handleAuthChange(true)} />
      )}
    </div>
  );
}

export default App;
