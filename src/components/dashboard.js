import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";
import { Link } from "react-router-dom";
import icon from "./icon.png";
import "./App.css";
import MapView from "./Mapview";
import Sidebar from "./Sidebar";
import "./Navbar.css";

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
  }
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  componentDidMount() {
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
      todos: [...this.state.todos, { name: item.name, id: item.id }],
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
        <div className="dashboard">
          <div className="dashboard-username">
            Username: {this.props.username}
          </div>
          <div className="dashboard-name">Name: {this.props.name}</div>
          <div className="dashboard-protected-data">
            Protected data: {this.props.protectedData}
          </div>
          <div className="topnav">
            <h1>Peek </h1>
            <img src={icon} alt="Logo" className="icon" />
          </div>
          <Sidebar
            disabled={this.state.disabled}
            trails={this.state.trails}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            mapItem={this.mapItem}
            disableButton={this.disableButton}
            todos={this.todos}
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

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
