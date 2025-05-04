import axios from 'axios';
import { BACKEND_SERVER_URL } from '../AppConfig';
import { toast } from 'react-toastify'

const Axios = axios.create({
  baseURL: `${BACKEND_SERVER_URL}/api/v1`,
  withCredentials: true,
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  response => response,
  error => {
    console.log(error.code)
    if (error.code === "ERR_NETWORK") {
      console.log("A server error ocurred")
      toast.error("A server error occurred. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default Axios;
