import axios from 'axios';
import { storage } from '../utils/storage';
export const AxiosConfig = () => {
  axios.defaults.baseURL = 'http://localhost:9000';
  axios.interceptors.request.use(
    (config) => {
      const localStore = storage.getItems();
      config.headers!.Authorization = `Bearer ${
        localStore ? localStore.user.token : null
      }`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
export const ax = axios;
