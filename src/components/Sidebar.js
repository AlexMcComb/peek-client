import React from "react";
import Filter from "./Filter";

import "./Sidebar.css";

const Sidebar = props => {
  return (
    <ul className="sidebar">
      <Filter
        handleSubmit={props.handleSubmit}
        handleChange={props.handleChange}
        getFavorites={props.getFavorites}
      />
      {props.trails.map(item => (
        <li key={item.id} className="polaroid">
          <img src={item.imgMedium} alt="park" />
          <h2
            onClick={() => {
              props.mapItem(item);
            }}
          >
            {item.name}
          </h2>

          <input id={item.id} className="toggle" type="checkbox" />
          <label htmlFor={item.id} className="lbl-toggle">
            More Info
          </label>
          <div className="collapsible-content">
            <div className="content-inner">
              <p>{item.summary}</p>
            </div>
            <button
              className="wishlistButton"
              disabled={props.disabled.indexOf(item.id) !== -1}
              onClick={() => {
                props.disableButton(item);
              }}
            >
              Add to Wishlist
            </button>
            <button
              todos={props.todos.indexOf(item.id) !== -1}
              onClick={() => {
                props.removeFavorite(item);
              }}
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
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
