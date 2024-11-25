import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;



  constructor() {
    const baseURL = 'http://localhost:8000/api';
    const headers = {
      Authorization: 'auth123',
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
  async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  // Função PUT
  async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  // Função DELETE
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export default ApiService;