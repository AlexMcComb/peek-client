import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "./Sidebar";
import mapMarkerURL from "./map-marker.svg";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

const url = `https://api.mapbox.com/styles/v1/alexmcc/cjry5mcrd195w1fo6aovuurl5/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`;

const myIcon = L.icon({
  iconUrl: mapMarkerURL,
  iconSize: [30, 32],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

const MapView = props => {
  const position = [props.lat, props.lng];
  return (
    <Map
      className="mobileMap"
      center={position}
      zoom={props.zoom - 2}
      maxZoom={18}
      minZoom={3}
      zoomControl={false}
    >
      <TileLayer url={url} />

      {props.trails.map(item => (
        <Marker
          position={[item.latitude, item.longitude]}
          icon={myIcon}
          key={item.id}
        >
          >
          <Popup autoPan={false}>
            <em>{item.name}</em>
            <br />
            Condition: {item.conditionStatus}
            <br />
            Condition Date: {item.conditionDate}
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default MapView;
