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
          <img src={item.imgMedium} alt="default" />
          <h2
            onClick={() => {
              props.mapItem(item);
            }}
          >
            {item.name}
          </h2>

          <input id={item.id} className="toggle" type="checkbox" />
          <label
            htmlFor={item.id}
            className="lbl-toggle label"
            onClick={() => {
              props.mapItem(item);
            }}
          >
            More Info
          </label>
          <div className="collapsible-content">
            <div className="content-inner label">
              <p>
                <strong>Location: </strong>
                {item.location}
              </p>
              <p>
                <strong>Rating: </strong>
                {item.stars}
              </p>
              <p>
                <strong>Length: </strong>
                {item.length} miles
              </p>
              <p>
                <strong>Ascent: </strong>
                {item.ascent} feet
              </p>
              <p>
                <strong>Difficulty: </strong>
                {item.difficulty}
              </p>
              <p>
                <strong>Summary: </strong> {item.summary}
              </p>
            </div>
            <button
              className="wishlistButton"
              disabled={props.disabled.indexOf(item.id) !== -1}
              onClick={() => {
                props.disableButton(item);
              }}
              style={{ display: props.wishButton }}
            >
              Add to Favorites
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
