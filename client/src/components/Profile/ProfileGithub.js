import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      clientSecret: "",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }
  render() {
    return (
      <div className="container">
        <h1>Profile Github</h1>
      </div>
    );
  }
}

export default ProfileGithub;
