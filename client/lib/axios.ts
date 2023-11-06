import axios from 'axios';

type HttpRequest = {
  headers: { [key: string]: string };
};

const createApi = ({ req }: { req: HttpRequest }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://localhost:5000',
      headers: req.headers,
    });
  } else {
    // Handle the client-side code here if needed
    const api = axios.create({
      baseURL: "http://localhost:5000",
    });
    // You can add client-side specific configurations if necessary
    return api;
  }
};

export default createApi;