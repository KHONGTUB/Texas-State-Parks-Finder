import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [sucess, setSucess] = useState(null);
  const navigate = useNavigate();

  const initialFormState = {
    email: "",
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
          email: "",
          user_name: "",
          password: "",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialFormState);

  const handleSignUp = () => {
    fetch("https://texas-state-parks.vercel.app/users/signup", {
      method: "POST",
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        navigate("/Login");
      } else {
        setSucess(false);
      }
    });
  };

  const handleChange = (e) => {
    dispatch({
      type: "HANDLE_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
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
              name="email"
              id="email"
              label="Email"
              variant="outlined"
            />
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
                handleSignUp();
              }}
              id="button"
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </div>
        <Link id="toSignUp" to="/Login">
          Already registered?
        </Link>
        {sucess === false && (
          <Alert id="alert" severity="error">
            <AlertTitle>Error</AlertTitle>
            Username Is Already Taken!
          </Alert>
        )}
      </div>
    </div>
  );
}
