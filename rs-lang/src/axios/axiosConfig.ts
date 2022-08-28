import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_DB,
});

const addToken = (token: string) => {
  instance.interceptors.request.use((config) => {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  });
};

export { instance, addToken };
