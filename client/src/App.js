import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./actions/authActions";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CheckoutPage from "./components/payment/CheckoutPage";
import store from "./Store";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { clearProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
//Check from Token:
if (localStorage.jwtToken) {
  //set auth token header off
  setAuthToken(localStorage.jwtToken);
  //decode token and get user into and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated:
  store.dispatch(setCurrentUser(decoded));
  //check for expired token:
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Log out User
    store.dispatch(logOutUser());
    //TODO: Clear current profile
    store.dispatch(clearProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Switch>
              <Route exact path="/" component={Landing} />
              {/* <div className="container"> */}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/checkout" component={CheckoutPage} />
              <Route exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            {/* </div> */}

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
