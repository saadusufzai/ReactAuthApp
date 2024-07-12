import axios from 'axios';
import EventBus from '../lib/EventBus';
import localStorage from '../lib/localStorage';

// Set up axios instance
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
});

// axios request interceptor
instance.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getToken();
    if (tokens && config.isAuth) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// refreshing makes sure that only one refresh token request is sent in case of multiple 401s
let refreshingToken = null;
const refreshRequest = (tokens) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/auth/refresh-tokens`, null, {
      headers: {
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    })
    .then(
      (data) => data,
      // If the refreshToken has expired as well
      (_error) => {
        EventBus.dispatch('logout');
        return Promise.reject(_error);
      }
    );
};
// axios response interceptor
instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const tokens = localStorage.getToken();
        if (tokens && tokens.refreshToken) {
          refreshingToken = refreshingToken
            ? refreshingToken
            : refreshRequest(tokens);
          const res = await refreshingToken;
          refreshingToken = null;
          const { accessToken, refreshToken } = res.data.data;
          localStorage.setToken({ accessToken, refreshToken });
          instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        }
      } else if (originalConfig._retry) {
        EventBus.dispatch('logout');
        return Promise.reject(error.response.data);
      }

      if (error.response.status === 403 && error.response.data) {
        const protectedPath = ['application'];
        const isProtectedPath = protectedPath.includes(
          window.location.pathname.replace('/', '')
        );
        if (isProtectedPath) EventBus.dispatch('logout');
        return Promise.reject(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
