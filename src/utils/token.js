import { PATHS } from 'src/routes/paths';
import axiosInstance from './axios';
import { jwtDecode } from 'jwt-decode';
import { isEmpty } from './type_check';
import { tokenConfirm } from 'src/components/dialog/confirmation';
export const TOKEN = 'token';
let expiredTimer;

export const isValidToken = () => {
  var isValid = false;
  const token = getToken();
  if (token) {
    const { exp } = decode(token);
    const currentTime = Date.now() / 1000;
    isValid = exp > currentTime;
  }
  return isValid;
};

export const decode = (token) => {
  if (isEmpty(token)) return {};
  var decodedToken = jwtDecode(token);
  return decodedToken;
};

export const tokenDialog = (exp) => {
  const currentTime = Date.now();

  // exp : seconds
  // currentTime : ms
  // subtracting : 10 minutes for the diaglog & potential error.
  const timeLeft = exp * 1000 - currentTime - 600000;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(async () => {
    await tokenConfirm();
  }, timeLeft);
};

export const deleteToken = () => {
  clearTimeout(expiredTimer);
  if (getToken()) {
    localStorage.removeItem(TOKEN);
    window.location.replace(PATHS.auth.login);
  }
};

export const setToken = async (token) => {
  if (token) {
    localStorage.setItem(TOKEN, token);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    const { exp } = decode(token);
    tokenDialog(exp);
  } else {
    localStorage.removeItem(TOKEN);

    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const setAxiosToken = () => {
  var token = getToken();
  setToken(token);
};

export const getToken = () => {
  var token = localStorage.getItem(TOKEN);
  return token;
};

export const getTokenRole = () => {
  var token = getToken();
  const { role } = decode(token);
  return role;
};
