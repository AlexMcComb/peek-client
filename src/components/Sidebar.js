import React from "react";
import Filter from "./Filter";
import MobileMap from "./MobileMap";
import windowSize from "react-window-size";
import "./Sidebar.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "checkbox",
      windowWidth: this.props.windowWidth
    };
  }

  componentDidMount() {
    let size = this.state.windowWidth;
    console.log(size);
    if (size <= 700) {
      this.setState({
        type: "radio"
      });
    } else {
      this.setState({
        type: "checkbox"
      });
    }
  }

  render() {
    return (
      <ul className="sidebar">
        <Filter
          handleSubmit={this.props.handleSubmit}
          handleChange={this.props.handleChange}
          getFavorites={this.props.getFavorites}
          filterTrails={this.props.filterTrails}
        />
        {this.props.trails.map(item => (
          <li key={item.id} className="polaroid">
            <img src={item.imgMedium} alt="default" />
            <h2
              onClick={() => {
                this.props.mapItem(item);
              }}
            >
              {item.name}
            </h2>

            <input
              id={item.id}
              className="toggle"
              type={this.state.type}
              name="toggleType"
            />
            <label
              htmlFor={item.id}
              className="lbl-toggle label"
              onClick={() => {
                this.props.mapItem(item);
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
                disabled={this.props.disabled.indexOf(item.id) !== -1}
                onClick={() => {
                  this.props.disableButton(item);
                }}
                style={{ display: this.props.wishButton }}
              >
                Add to Favorites
              </button>

              <button
                className="removeButton"
                onClick={() => {
                  this.props.removeFavorite(item);
                }}
                style={{ display: this.props.remove }}
              >
                Remove
              </button>

              <MobileMap
                trails={this.props.trails}
                zoom={this.props.zoom}
                lat={this.props.lat}
                lng={this.props.lng}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default windowSize(Sidebar);
