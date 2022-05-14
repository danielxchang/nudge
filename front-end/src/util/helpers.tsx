import { MIN_PW_LENGTH } from "./constants";

export const validateInputs = (
  isLogin: boolean,
  email: string,
  password: string,
  name: string
) => {
  const nameValid = name && name.trim() !== "";
  const emailRegEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  const emailValid = email.trim().match(emailRegEx);
  const passwordValid = password.trim().length >= MIN_PW_LENGTH;
  if (
    (isLogin && emailValid && passwordValid) ||
    (!isLogin && nameValid && emailValid && passwordValid)
  ) {
    return true;
  }
  return false;
};
