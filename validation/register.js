const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidateRegisterInput(data){
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''
  
  if(!validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = "Name must be between 2 and 30 characters";
  }
  if(validator.isEmpty(data.name)){
    errors.name = 'Name field is required';
  }
  if(!validator.isLength(data.lastname, {min: 2, max: 30})){
    errors.lastname = "lastname must be between 2 and 30 characters";
  }
  if(validator.isEmpty(data.lastname)){
    errors.lastname = 'lastname field is required';
  }
  if(!validator.isLength(data.username, {min: 2, max: 30})){
    errors.username = "username must be between 2 and 30 characters";
  }
  if(validator.isEmpty(data.username)){
    errors.username = 'username field is required';
  }
  if(validator.isEmpty(data.email)){
    errors.email = 'Name field is required';
  }
  if(!validator.isEmail(data.email)){
    errors.email= "Email is not valid";
  }
  if(validator.isEmpty(data.password)){
    errors.password= "Password is required";
  }
  if(!validator.isLength(data.password, { min:6, max:30})){
    errors.password = "Password must have 6 characters";
  }
  if(validator.isEmpty(data.password2)){
    errors.password= "Password confirmation is required";
  }
  if(!validator.equals(data.password, data.password2)){
    errors.password = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}