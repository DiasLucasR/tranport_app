import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {

    const baseURL = process.env.REACT_APP_API_URL;
    const headers = {
      Authorization: process.env.REACT_APP_AUTHORIZATION_LOCAL,
    };
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });

    // Interceptor para lidar com respostas
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
      }
    );
  }

  // Função GET
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  // Função POST
  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  // Função PUT
  async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  // Função DELETE
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }
}

export default ApiService;