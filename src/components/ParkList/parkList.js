import React from "react";
import "./parkList.css";

export default function ParkList({
  index,
  element,
  setMouseOver,
  activeMarker,
  setActiveMarker,
  setCenter,
}) {
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      setActiveMarker(null);
      return;
    }
    setActiveMarker(marker);
  };
  return (
    <li
      key={index}
      id="parkList"
      onClick={() => {
        handleActiveMarker(element.id);
        setCenter({
          lat: element.latitude,
          lng: element.longitude,
        });
      }}
      onMouseOver={() => {
        setMouseOver(element.id);
      }}
      onMouseOut={() => {
        setMouseOver(null);
      }}
    >
      <h3>{element.park_name}</h3>
      {/* <p>{element.park_description}</p> */}
    </li>
  );
}
