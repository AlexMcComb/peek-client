import React from "react";
import Filter from "./Filter";
import MobileMap from "./MobileMap";

import "./Sidebar.css";

const Sidebar = props => {
  return (
    <ul className="sidebar">
      <Filter
        handleSubmit={props.handleSubmit}
        handleChange={props.handleChange}
        getFavorites={props.getFavorites}
        filterTrails={props.filterTrails}
      />

      {props.trails.map(item => (
        <li key={item.id} className="polaroid">
          <img src={item.imgMedium} alt="park" />
          <h2
            onClick={() => {
              props.mapItem(item);
            }}
          >
            🏔 {item.name}
          </h2>

          <input id={item.id} className="toggle" type="checkbox" />
          <label htmlFor={item.id} className="lbl-toggle label">
            More Info
          </label>
          <div className="collapsible-content">
            <div className="content-inner label">
              <p>{item.summary}</p>
            </div>
            <button
              className="wishlistButton"
              disabled={props.disabled.indexOf(item.id) !== -1}
              onClick={() => {
                props.disableButton(item);
              }}
              style={{ display: props.wishButton }}
            >
              Add to Wishlist
            </button>

            <button
              className="removeButton"
              todos={props.todos.indexOf(item.id) !== -1}
              onClick={() => {
                props.removeFavorite(item);
              }}
              style={{ display: props.remove }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                props.mapItem(item);
              }}
            >
              zoom to
            </button>
            <MobileMap
              trails={props.trails}
              zoom={props.zoom}
              lat={props.lat}
              lng={props.lng}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
