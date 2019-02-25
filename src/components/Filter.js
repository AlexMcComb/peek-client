import React from "react";

const MapView = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Maximum Distance
        <select name="maxDis" onChange={props.handleChange}>
          <option value="" />
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
      <label>
        Maximum Results
        <select name="maxRes" onChange={props.handleChange}>
          <option value="" />
          <option value="1">1</option>
          <option value="2">5</option>
          <option value="3">10</option>
          <option value="4">20</option>
          <option value="5">30</option>
          <option value="5">50</option>
        </select>
      </label>
      <label>
        Rating
        <select name="star" onChange={props.handleChange}>
          <option value="" />
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default MapView;
