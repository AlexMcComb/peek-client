import React from "react";
import "./Filter.css";

const MapView = props => {
  return (
    <div>
      <input id="filter" className="toggle" type="checkbox" />
      <label htmlFor="filter" className="lbl-toggle">
        Filter
      </label>
      <div className="collapsible-content">
        <div className="content-inner">
          <form onSubmit={props.handleSubmit}>
            <select name="maxDis" onChange={props.handleChange}>
              <option selected disabled>
                Distance
              </option>
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="15">15 miles</option>
              <option value="20">20 miles</option>
            </select>
            <select name="maxRes" onChange={props.handleChange}>
              <option selected disabled>
                Results
              </option>
              <option value="1">1</option>
              <option value="2">5</option>
              <option value="3">10</option>
              <option value="4">20</option>
              <option value="5">30</option>
              <option value="5">50</option>
            </select>
            <select name="star" onChange={props.handleChange}>
              <option selected disabled>
                Minimum Rating
              </option>
              <option value="1">1 star</option>
              <option value="2">2 star</option>
              <option value="3">3 star</option>
              <option value="4">4 star</option>
              <option value="5">5 star</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MapView;
