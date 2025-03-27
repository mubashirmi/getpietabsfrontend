import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://getpie-tools-api.getpie.io/api', // Your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
