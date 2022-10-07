import React from "react";
import { Route, Routes } from "react-router";
import Welcome from "./components/welcome/welcome";
import MapDisplay from "./components/Map/map";
import Login from "./components/Login/Login";
import Blogs from "./components/Blog/Blogs";
import AddBlog from "./components/addBlog/addBlog";
import SignUp from "./components/signUp/signUp";
import Account from "./components/account/Account";

const Router = ({ loggedIn, setLoggedIn, username, setUsername }) => {
  return (
    <Routes>
      <Route path="/Gallery" element={<Welcome />} />
      <Route exact path="/" element={<MapDisplay />} />
      <Route
        path="/Login"
        element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />}
      />
      <Route path="/Blogs" element={<Blogs loggedIn={loggedIn} />} />
      <Route path="/AddBlog" element={<AddBlog username={username} />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Account" element={<Account username={username} />} />
    </Routes>
  );
};

export default Router;
