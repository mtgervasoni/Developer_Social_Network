//Login Rules
//documentation at validator github (validates strings.. is empty.. is float.. is creditcard.. is email..)
//issue: has to be a string to validate;
const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Job school is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Add a degree type";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
