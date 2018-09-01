//Login Rules
//documentation at validator github (validates strings.. is empty.. is float.. is creditcard.. is email..)
//issue: has to be a string to validate;
const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 8, max: 300 })) {
    errors.text = "Post must be betwwen 8 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post body is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
