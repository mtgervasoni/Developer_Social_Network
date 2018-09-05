import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import InputGroup from "../common/InputGroup";

import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  onSubmit = event => {
    event.preventDefault();

    // const newProfile = {
    //   handle: this.state.handle,
    //   company: this.state.company
    // };
    // this.props.loginUser(newProfile);
    // console.log(newProfile);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;

    let socialInputs;
    let { displaySocialInputs } = this.state;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={this.twitter}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={this.linkedin}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            errors={this.instagram}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={this.facebook}
          />
          <InputGroup
            placeholder="YouTube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            errors={this.youtube}
          />
        </div>
      );
    }

    //select options for status:
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Developer", value: "Developer" },
      { label: "Developer", value: "Developer" }
    ];
    return (
      <div classsName="container">
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center"> Create Your Profile</h1>
                <p className="lead text-center">
                  {" "}
                  Let's get some information to make your profile stand out
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    errors={errors.handle}
                    info="A unqiue handle for your profile URL. Your full name, company name, nickname"
                  />

                  <SelectListGroup
                    placeholder="* Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    errors={errors.status}
                    options={options}
                    info="List your current status in your career"
                  />

                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    errors={errors.company}
                    info="List your current company"
                  />

                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    errors={errors.website}
                    info="List your profile, project or business website"
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    errors={errors.location}
                    info="List your location"
                  />
                  <TextFieldGroup
                    placeholder="* Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    errors={errors.skills}
                    info="List your skills with a comma seperating each skill"
                  />
                  <TextFieldGroup
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                    errors={errors.githubusername}
                    info="If you want to display your latest repos and a Github link, include your username"
                  />
                  <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    errors={errors.bio}
                    info="Tell us a little about yourself"
                  />

                  <div className="mb-3">
                    <button
                      className="btn btn-light"
                      onClick={() =>
                        this.setState(prevState => ({
                          displaySocialInputs: !prevState.displaySocialInputs
                        }))
                      }
                    >
                      Add Social Network Links
                    </button>
                    <span className="text-muted"> Optional</span>
                  </div>

                  {socialInputs}
                  <input
                    type="submit"
                    value="Submit"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
