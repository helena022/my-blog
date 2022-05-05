export const hasValue = (value: string | number): boolean => value !== '';

export const isBetween = (length: number, min: number, max: number): boolean =>
  length >= min && length <= max;

export const isEmailValid = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isPasswordSecure = (password: string): boolean => {
  const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  return re.test(password);
};

export const valuesMatch = (
  value: string | number | boolean,
  repeatedValue: string | number | boolean,
): boolean => {
  return value === repeatedValue;
};

export const alphanumericCharsOnly = (value: string): boolean => {
  const re = /^[A-Za-z0-9]+$/;
  return re.test(value);
};
