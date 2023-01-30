import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

class Network {
  private static instance: axios.AxiosInstance;

  static getInstance(): axios.AxiosInstance {
    if (!Network.instance) {
      Network.instance = axios.create({
        baseURL: 'https://api.example.com',
      });

      Network.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        // Add your custom request logic here
        // Example: Adding a header to every request
        // config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        return config;
      });

      Network.instance.interceptors.response.use(
        (response: AxiosResponse) => {
          // Add your custom response logic here
          return response;
        },
        (error: unknown) => {
          // Add your custom error handling logic here
          return Promise.reject(error);
        }
      );
    }
    return Network.instance;
  }
}

export default Network.getInstance();
