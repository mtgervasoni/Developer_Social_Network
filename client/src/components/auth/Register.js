import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  //If logged in, go to dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Send to action type registeruser.
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="text"
                    error={errors.name}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeHandler}
                  />
                  <TextFieldGroup
                    type="email"
                    error={errors.email}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                    info={
                      <p>
                        This site uses&nbsp;
                        <a href="https://gravatar.com">Gravatar</a> so if you
                        want a profile image, use a&nbsp;
                        <a href="https://gravatar.com">Gravatar email</a>
                      </p>
                    }
                  />
                  <TextFieldGroup
                    type="password"
                    error={errors.password}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                  />
                  <TextFieldGroup
                    type="password"
                    error={errors.password2}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChangeHandler}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
