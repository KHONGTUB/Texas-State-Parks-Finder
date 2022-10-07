import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Router
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          username={username}
          setUsername={setUsername}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
