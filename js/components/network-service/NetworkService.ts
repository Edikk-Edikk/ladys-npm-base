import { ApiError } from './errors/ApiError';
import { isPlainObject } from 'lodash';
import { ErrorWithRedirect } from './errors/ErrorWithRedirect';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { ApiErrorUnauthorized } from './errors/ApiErrorUnauthorized';
import { ConfigType } from './types/ConfigType';
import { ERROR_MESSAGE_DEFAULT } from '../../constants';
import { ResponseType } from './types/ResponseType';

class NetworkService {
  protected readonly axiosInstance: AxiosInstance;

  constructor(baseUrl: string, config = {}) {
    const configNew = {
      withCredentials: true,
      baseURL: baseUrl,
      ...config,
    };
    this.axiosInstance = axios.create(configNew);
    this.applyInterceptors();
  }

  get<T>(url: string, config?: ConfigType): Promise<ResponseType<T>> {
    return this.axiosInstance.get(url, config);
  }

  post<T>(url: string, data?: object | string, config?: ConfigType): Promise<ResponseType<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  private applyInterceptors() {
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      const newConfig = { ...config };
      newConfig.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      newConfig.paramsSerializer = (params) => qs.stringify(params, {
        arrayFormat: 'brackets',
      });
      return newConfig;
    });
    this.axiosInstance.interceptors.response.use(
      // @ts-ignore
      (response: AxiosResponse<ResponseType<any>>) => {
        if (!isPlainObject(response.data)) {
          return Promise.reject(new ApiError(ERROR_MESSAGE_DEFAULT, response.data.statusCode));
        }

        if (!response.data.status && 'error' in response.data) {
          if (response.data.statusCode === 401) {
            return Promise.reject(new ApiErrorUnauthorized(response.data.error, response.data.statusCode));
          }
          return Promise.reject(new ApiError(response.data.error, response.data.statusCode));
        }
        if ('redirectUrl' in response.data) {
          return Promise.reject(new ErrorWithRedirect(response.data.redirectUrl));
        }

        const newResponse: ResponseType<any> = {
          xhr: response.request,
          status: response.data.status,
          statusCode: response.data.statusCode,
        };
        if ('data' in response.data) {
          newResponse.data = response.data.data;
        }
        if ('formErrors' in response.data) {
          newResponse.formErrors = response.data.formErrors;
        }
        return newResponse;
      },
      (error: AxiosError) => Promise.reject(new ApiError(error.message)),
    );
  }
}

export { NetworkService };
