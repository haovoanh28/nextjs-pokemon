import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

class Network {
  private static instance: Network;

  private constructor() {
  }

  static getInstance(): Network {
    if (!Network.instance) {
      Network.instance = new Network();
      Network.instance.setupInterceptors();
    }

    return Network.instance;
  }

  private setupInterceptors() {
    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          config.baseURL = "https://graphql-pokeapi.graphcdn.app/";
          // Add any custom logic for request interception here
          return config;
        },
        (error) => {
          // Add any custom logic for request error handling here
          return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response: AxiosResponse) => {
          // Add any custom logic for response interception here
          return response;
        },
        (error) => {
          // Add any custom logic for response error handling here
          return Promise.reject(error);
        }
    );
  }

  async callRequest(config: AxiosRequestConfig) {
    return axios(config).then(response => Promise.resolve(response.data.data)).catch(error => {
      // console.log("error ==> ", error);
      Promise.reject(error);
    });
  }

  async get(config: Omit<AxiosRequestConfig, 'method'>) {
    return Network.instance.callRequest({
      method: "GET",
      ...config
    });
  }

  async post(config: Omit<AxiosRequestConfig, 'method'>) {
    return Network.instance.callRequest({
      method: "POST",
      ...config
    });
  }
}

export default Network.getInstance();