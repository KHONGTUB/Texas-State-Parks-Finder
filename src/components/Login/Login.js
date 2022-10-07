import React, { useReducer, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import cookie from "cookie";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();

  const [sucess, setSucess] = useState(null);

  const initialFormState = {
    user_name: "",
    password: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "HANDLE_INPUT_TEXT":
        return {
          ...state,
          [action.field]: action.payload,
        };
      case "RESET_ITEM":
        return {
          user_name: "",
          password: "",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialFormState);

  const handleChange = (e) => {
    dispatch({
      type: "HANDLE_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleLogin = () => {
    fetch("https://texas-state-parks.vercel.app/users/login", {
      method: "POST",
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setSucess(false);
        }
      })
      .then((data) => {
        document.cookie = cookie.serialize("access_token", data.token, {
          maxAge: 1000 * 60,
        });
        document.cookie = cookie.serialize("username", data.username, {
          maxAge: 1000 * 60,
        });
        setLoggedIn(cookie.parse(document.cookie).access_token);
        navigate("/");
      });
  };

  return (
    <div>
      <div id="contain">
        <div>
          <Box
            className="loginForm"
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={handleChange}
              name="user_name"
              id="Username"
              label="Username"
              variant="outlined"
            />
            <TextField
              onChange={handleChange}
              name="password"
              id="Password"
              label="Password"
              type="password"
              variant="outlined"
            />
            <Button
              onClick={() => {
                handleLogin();
              }}
              id="button"
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </div>
        <Link id="toSignUp" to="/SignUp">
          Not registered?
        </Link>
        {sucess === false && (
          <Alert id="alert" severity="error">
            <AlertTitle>Error</AlertTitle>
            Username or Password was incorrect
          </Alert>
        )}
      </div>
    </div>
  );
}
