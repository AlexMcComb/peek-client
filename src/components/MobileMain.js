import React from "react";
import Filter from "./Filter";
import MobileMap from "./MobileMap";

import "./MobileMain.css";

const MobileMain = props => {
  return (
    <ul className="bar">
      <Filter
        handleSubmit={props.handleSubmit}
        handleChange={props.handleChange}
        getFavorites={props.getFavorites}
        filterTrails={props.filterTrails}
      />

      {props.trails.map(item => (
        <li key={item.id} className="polaroids">
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
            className="lbl-toggles labels"
            onClick={() => {
              props.mapItem(item);
            }}
          >
            More Info
          </label>

          <div className="collapsible-contents">
            <div className="contents-inner labels">
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
              className="wishlistButtons"
              disabled={props.disabled.indexOf(item.id) !== -1}
              onClick={() => {
                props.disableButton(item);
              }}
              style={{ display: props.wishButton }}
            >
              Add to Favorites
            </button>

            <button
              className="removeButtons"
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

export default MobileMain;
