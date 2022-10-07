import React, { useEffect, useState } from "react";
import cookie from "cookie";
import { Link } from "react-router-dom";
import "./Nav.css";
import logo from "../assets/texasLogo.png";
import { useNavigate } from "react-router-dom";

export default function Nav({ loggedIn, setLoggedIn }) {
  const fetchCookie = () => {
    setLoggedIn(cookie.parse(document.cookie).access_token);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchCookie();
  }, []);
  return (
    <nav>
      <ul className="list">
        <li>
          <Link className="link" to="/">
            <img id="logo" src={logo} alt="texas"></img>
          </Link>
        </li>
        <div className="menu">
          <li className="items" id="adventure">
            <Link className="link" to="/Gallery">
              Gallery
            </Link>
          </li>

          <li className="items">
            <Link className="link" to="/Blogs">
              Blogs
            </Link>
          </li>
          {loggedIn ? (
            <li
              id="log"
              className="items"
              onClick={() => {
                setLoggedIn(null);
                document.cookie = cookie.serialize("access_token", null, {
                  maxAge: 0,
                });
                document.cookie = cookie.serialize("username", null, {
                  maxAge: 0,
                });
                fetchCookie();
                navigate("/Login");
              }}
            >
              <Link className="link" to="/Login">
                Logout
              </Link>
            </li>
          ) : (
            <li id="log" className="items">
              <Link className="link" to="/Login">
                Login
              </Link>
            </li>
          )}
        </div>
        <li className="items">
          {loggedIn && (
            <Link className="link" to="/Account">
              Account
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
