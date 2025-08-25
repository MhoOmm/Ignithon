import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sanjeevni-backend.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://sanjeevni-frontend-asef.onrender.com'
  },
  timeout: 15000,
  validateStatus: status => status >= 200 && status < 500
});

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.error('Network Error:', error);
      return Promise.reject(new Error('Network error, please check your connection'));
    }
    return Promise.reject(error);
  }
);

export default instance;
