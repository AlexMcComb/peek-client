import React from "react";
import "./Filter.css";

const MapView = props => {
  return (
    <div className="mapView">
      <input id="favorties" className="favorites-toggle" type="checkbox" />
      <label
        htmlFor="favorties"
        className="favorites label"
        onClick={props.getFavorites}
      >
        Favorites
      </label>
      <input id="filter" className="toggle" type="checkbox" />
      <label
        htmlFor="filter"
        className="lbl-toggle-filter label"
        onClick={props.filterTrails}
      >
        Search
      </label>
      <div className="collapsible-content">
        <div className="content-inner">
          <form onSubmit={props.handleSubmit}>
            <select name="maxDis" onChange={props.handleChange}>
              <option disabled selected>
                Distance
              </option>
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="15">15 miles</option>
              <option value="20">20 miles</option>
            </select>
            <select name="maxRes" onChange={props.handleChange}>
              <option disabled selected>
                Results
              </option>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
            <select name="star" onChange={props.handleChange}>
              <option disabled selected>
                Rating
              </option>
              <option value="1">1 star</option>
              <option value="2">2 star</option>
              <option value="3">3 star</option>
              <option value="4">4 star</option>
              <option value="5">5 star</option>
            </select>
            <input type="submit" value="Submit" className="input" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MapView;
