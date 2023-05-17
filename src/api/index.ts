import axios, { AxiosRequestConfig } from 'axios';

type PostBody = {
  title: string;
};

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data, status }) => {
  if (status === 200) {
    return data;
  }
  throw new Error('something went wrong');
});

const apiRequest = {
  get: (url: string) => baseInstance.get(url),
  delete: (url: string) => baseInstance.delete(url),
  post: (url: string, data: PostBody, config?: AxiosRequestConfig) =>
    baseInstance.post(url, data, config),
};

export default apiRequest;
