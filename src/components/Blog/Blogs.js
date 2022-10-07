import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import "./Blogs.css";
import { Token } from "@mui/icons-material";

export default function Blogs({ loggedIn }) {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    fetch("https://texas-state-parks.vercel.app/posts")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div>
          <Button
            onClick={() => {
              navigate("/AddBlog");
            }}
            id="blogButton"
            variant="outlined"
          >
            Post a Blog
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              navigate("/Login");
            }}
            id="blogButton"
            variant="outlined"
            color="error"
          >
            Login to Blog
          </Button>
        </div>
      )}
      <ul id="Blog">
        {blogs.map((element, index) => {
          return (
            <li id="Blogs" key={index}>
              <h3>{element.username}</h3>
              <p id="createdAt">{element.created_at}</p>
              <a
                href={`https://tpwd.texas.gov/state-parks/${element.park_location
                  .substring(0, element.park_location.indexOf(" State Park"))
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                id="parkLocation"
              >
                {element.park_location}
              </a>
              <p>{element.post}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
