import React from "react";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";

import "./App.css";
import MapView from "./Mapview";
import Sidebar from "./Sidebar";

const API_KEY = process.env.REACT_APP_TRAILS_API_KEY;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      lng: -111.85,
      zoom: 10,
      isLoaded: false,
      trails: [],
      todos: [],
      disabled: [],
      maxDist: "",
      star: "",
      maxRes: ""
    };
    this.disableButton = this.disableButton.bind(this);
    this.mapItem = this.mapItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
    fetch(
      `https://www.hikingproject.com/data/get-trails?lat=40.777&lon=-111.628&maxResults=0&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  filterTrails() {
    fetch(
      `https://www.hikingproject.com/data/get-trails?lat=40.777&lon=-111.628&maxDistance=${
        this.state.maxDist
      }&minStars=${this.state.star}&maxResults=${
        this.state.maxRes
      }&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  getFavorites() {
    let arr = [...this.state.todos];
    fetch(
      `https://www.hikingproject.com/data/get-trails-by-id?ids=${arr}&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  removeFavorite(item) {
    let array = [...this.state.todos]; // make a separate copy of the array
    array.splice(item, 1);
    this.setState({ todos: array });
  }

  handleSubmit(e) {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    this.filterTrails();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  mapItem = item => {
    this.setState({
      lat: item.latitude,
      lng: item.longitude,
      zoom: 16
    });
  };

  disableButton(item) {
    this.setState({
      todos: [...this.state.todos, item.id],
      disabled: [...this.state.disabled, item.id]
    });
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Sidebar
            disabled={this.state.disabled}
            trails={this.state.trails}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            getFavorites={this.getFavorites}
            mapItem={this.mapItem}
            disableButton={this.disableButton}
            removeFavorite={this.removeFavorite}
            todos={this.state.todos}
          />
          <MapView
            trails={this.state.trails}
            zoom={this.state.zoom}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </div>
      );
    }
  }
}

export default requiresLogin()(Dashboard);
