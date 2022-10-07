import React, { useEffect, useState } from "react";
import ParkMarker from "../ParkMarker/parkMarker";
import ParkList from "../ParkList/parkList";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPreciseDistance } from "geolib";
import "./map.css";

export default function MapDisplay() {
  const [center, setCenter] = useState({
    lat: 31.9686,
    lng: -99.9018,
  });
  const [location, setLocation] = useState([]);
  const [sorted, setSorting] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mouseOver, setMouseOver] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function calculate(userlat, userlng, lat, long) {
    return getPreciseDistance(
      {
        latitude: userlat,
        longitude: userlng,
      },
      {
        latitude: lat,
        longitude: long,
      }
    );
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_KEY,
  });

  function fetchData() {
    fetch("https://texas-state-parks.vercel.app/parks")
      .then((response) => response.json())
      .then((data) => {
        sortParks(data);
      });
  }

  function sortParks(parks) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
      parks.sort((a, b) => {
        let distanceA = calculate(
          position.coords.latitude,
          position.coords.longitude,
          a.latitude,
          a.longitude
        );
        let distanceB = calculate(
          position.coords.latitude,
          position.coords.longitude,
          b.latitude,
          b.longitude
        );

        return distanceA - distanceB;
      });
      setSorting(parks);
    });
  }

  return (
    <div id="map">
      <ol style={{ height: "93vh", width: 500, overflow: "auto" }}>
        {sorted.map((element, index) => {
          return (
            <ParkList
              key={index}
              index={index}
              element={element}
              setMouseOver={setMouseOver}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
              setCenter={setCenter}
            />
          );
        })}
      </ol>

      {isLoaded && (
        <GoogleMap
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={{
            width: "90vw",
            height: "94vh",
          }}
          center={center}
          zoom={7}
        >
          <Marker
            label={"You"}
            animation={window.google.maps.Animation.DROP}
            position={{
              lat: location.latitude,
              lng: location.longitude,
            }}
          ></Marker>

          {sorted.map((element, index) => {
            return (
              <ParkMarker
                key={index}
                element={element}
                index={index}
                activeMarker={activeMarker}
                setActiveMarker={setActiveMarker}
                setCenter={setCenter}
                mouseOver={mouseOver}
                setMouseOver={setMouseOver}
              />
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
}
