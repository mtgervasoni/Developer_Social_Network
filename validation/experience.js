//Login Rules
//documentation at validator github (validates strings.. is empty.. is float.. is creditcard.. is email..)
//issue: has to be a string to validate;
const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Add a company name";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
