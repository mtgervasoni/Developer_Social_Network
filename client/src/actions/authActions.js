import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User (Action creator)
export const registerUser = (userData, history) => dispatch => {
  // send info to backend:
  axios
    .post("/api/users/register", userData)
    //redirect to login page: this.props.history.push('/login')
    .then(res => history.push("/login"))
    //   .catch(err => console.log(err.response.data));
    //   .catch(err => this.setState({ errors: err.response.data }));
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login: Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      //Set token to localStorage:
      localStorage.setItem("jwtToken", token);
      //Set token to Auth Header
      setAuthToken(token);
      //Decode token to get user data:
      const decoded = jwt_decode(token);
      // set current user:
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged-in user:
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log out User
export const logOutUser = () => dispatch => {
  // Remove token from local storage:
  localStorage.removeItem("jwtToken");
  //Remove auth header from future requests
  setAuthToken(false);
  // Set current user to empty object {} to set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
