import React, { useEffect, useState } from "react";
import cookie from "cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Account.css";

export default function Account() {
  const [yourPost, setYourPost] = useState([]);
  const fetchData = () => {
    fetch(
      `https://texas-state-parks.vercel.app/posts/${
        cookie.parse(document.cookie).username
      }`
    )
      .then((res) => res.json())
      .then((data) => setYourPost(data));
  };

  const handleDelete = (id) => {
    fetch(`https://texas-state-parks.vercel.app/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        fetchData();
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ul id="Blog">
        <h3>Your Post's:</h3>
        {yourPost.map((element, index) => {
          return (
            <li id="Blogs" key={index}>
              <div id="deleteRow">
                <h3>{element.username}</h3>
                <DeleteIcon
                  onClick={() => {
                    handleDelete(element.id);
                  }}
                  id="delete"
                />
              </div>

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
