import axiosInstance from 'src/utils/axios';
import { ENDPOINTS } from './endpoints';

export async function login(email, password) {
  const data = { email, password };
  var ret = await axiosInstance.post(ENDPOINTS.auth.login, data);
  return ret.data;
}

export async function refresh() {
  var ret = await axiosInstance.get(ENDPOINTS.auth.refresh);
  return ret.data;
}

export async function register(data) {
  var ret = await axiosInstance.post(ENDPOINTS.auth.register, data);
  return ret.data;
}
