//Login Rules
//documentation at validator github (validates strings.. is empty.. is float.. is creditcard.. is email..)
//issue: has to be a string to validate;
const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.handle = "Status field is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.handle = "Skills field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.website = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
