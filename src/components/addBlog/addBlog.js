import React, { useEffect, useState } from "react";
import Select from "react-select";
import moment from "moment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router";
import cookie from "cookie";
import "./addBlog.css";

moment().format();
export default function AddBlog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState("");
  const [visited, setVisited] = useState("");
  const [parks, setParks] = useState([]);

  const handleChange = (e) => {
    if (e.target) setBlog(e.target.value);
    else setVisited(e.value);
  };

  const fetchPark = () => {
    fetch("https://texas-state-parks.vercel.app/parks")
      .then((response) => response.json())
      .then((data) => {
        setParks(data);
      });
  };

  const handleSubmit = () => {
    fetch("https://texas-state-parks.vercel.app/posts", {
      method: "POST",
      body: JSON.stringify({
        user_name: cookie.parse(document.cookie).username,
        created_at: moment().format("MMMM Do YYYY"),
        park_location: visited,
        post: blog,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
      },
    }).then((res) => {
      if (res.ok) {
        navigate("/Blogs");
      }
    });
  };

  useEffect(() => {
    fetchPark();
  }, []);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: 600,
            height: 600,
          },
        }}
      >
        <Paper id="container" elevation={10}>
          <div id="username">
            <Chip
              color="default"
              label={cookie.parse(document.cookie).username}
            />
          </div>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: 500 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={handleChange}
              id="Blog"
              rows={15}
              label="Blog"
              multiline
              variant="filled"
            />
          </Box>
          <div id="selectPark">
            <label>
              Select a park:
              <Select
                onChange={handleChange}
                options={parks.map((element) => ({
                  value: element.park_name,
                  label: element.park_name,
                }))}
              />
            </label>
          </div>

          <Button id="button" onClick={handleSubmit} variant="outlined">
            Post Blog!
          </Button>
        </Paper>
      </Box>
    </div>
  );
}
