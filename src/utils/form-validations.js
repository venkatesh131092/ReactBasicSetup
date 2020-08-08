/* eslint-disable */

export const required = value => (value ? undefined : "Required");

export const isEqualToPasswordField = (value, values) =>
  value === values.password
    ? undefined
    : "Confirm Password do not match password.";

export const isEmail = value => {
  const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return emailregex.test(value) ? undefined : "Enter valid email";
};

export const mustBeNumber = value =>
  isNaN(value) ? "Must be a number" : undefined;

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
