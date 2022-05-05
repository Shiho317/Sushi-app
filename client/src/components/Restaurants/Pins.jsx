import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker } from "react-map-gl";
import Card from "./Card";
import sushiPins from "../../images/sushi-pin.png";

const Pins = ({
  data,
  opens,
  handleMakerClick,
  isCurrent,
  setIsCurrent,
  isCurrentView,
}) => {
  const long = data.coordinates.longitude;
  const lat = data.coordinates.latitude;
  const id = data.id;

  return (
    <>
      <Marker
        latitude={lat}
        longitude={long}
        offsetLeft={-3.5 * isCurrentView.zoom}
        offsetTop={-7 * isCurrentView.zoom}
      >
        <img
          src={sushiPins}
          alt="sushi-pin"
          style={{ width: "2rem" }}
          onClick={() => handleMakerClick(id, lat, long)}
        />
      </Marker>
      {id === isCurrent && (
        <Card
          data={data}
          opens={opens}
          id={id}
          lat={lat}
          long={long}
          setIsCurrent={setIsCurrent}
        />
      )}
    </>
  );
};

export default Pins;
