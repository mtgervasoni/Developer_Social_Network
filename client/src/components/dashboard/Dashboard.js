import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    //Add profile to state: (from redux reducer/action/index)
    this.props.getCurrentProfile();
  }

  onDeleteClick = event => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        //display profile:
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              {" "}
              Welcome <a href={`/profile/${profile.handle}`}> {user.name}</a>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education experience={profile.education} />

            <div style={{ marginBotton: "60px" }}>
              <button className="btn btn-danger" onClick={this.onDeleteClick}>
                {" "}
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        //User logged in but has no profile:
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Welcome {user.name}</p>
            <p>You haven't set up a profile yet, please add some information</p>
            <a href="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </a>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
