import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_DB,
});

let interceptor: number;

const addToken = (token: string) => {
  interceptor = instance.interceptors.request.use((config) => {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    return config;
  });
};

const removeToken = () => {
  if (interceptor) {
    instance.interceptors.request.eject(interceptor);
  }
};

export { instance, addToken, removeToken };
