import React from "react";
import { Marker } from "@react-google-maps/api";
import { InfoWindowF } from "@react-google-maps/api";

export default function ParkMarker({
  element,
  index,
  activeMarker,
  setActiveMarker,
  setCenter,
  mouseOver,
  setMouseOver,
}) {
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      setActiveMarker(null);
      return;
    }
    setActiveMarker(marker);
  };
  return (
    <Marker
      onMouseOver={() => {
        setMouseOver(element.id);
      }}
      onMouseOut={() => {
        setMouseOver(null);
      }}
      animation={
        mouseOver === element.id ? window.google.maps.Animation.BOUNCE : null
      }
      onClick={() => {
        handleActiveMarker(element.id);
        setCenter({
          lat: element.latitude,
          lng: element.longitude,
        });
      }}
      key={index}
      position={{
        lat: element.latitude,
        lng: element.longitude,
      }}
    >
      {" "}
      {activeMarker === element.id ? (
        <InfoWindowF
          options={{ disableAutoPan: true }}
          onCloseClick={() => setActiveMarker(null)}
        >
          <div>
            <h2>
              {index + 1}. {element.park_name}
            </h2>
            <a href={element.url_link}>More Info</a>
            <p>{element.park_description}</p>
          </div>
        </InfoWindowF>
      ) : null}
    </Marker>
  );
}
