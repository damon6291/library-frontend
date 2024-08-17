import axios from 'axios';
import { API_URL } from 'src/config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: API_URL });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
// );

axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const revalidateOnlyStaleOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export const noRevalidateOnlyStaleOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
