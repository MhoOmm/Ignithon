import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sanjeevni-backend.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://sanjeevni-frontend-asef.onrender.com'
  },
  timeout: 30000, // Increased timeout for render.com
  validateStatus: status => status >= 200 && status < 500
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: new Date().getTime()
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timed out. Please try again.'));
    }
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    return Promise.reject(error);
  }
);

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
