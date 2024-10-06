import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isNil } from 'lodash';

/********************************************************************************************************************************
 *                                                            Util                                                              *
 ********************************************************************************************************************************/
export const errorLoggerHandler = (method: string, url: string, error: unknown) => {
  let statusCode: number | undefined;
  let message: string;

  if (axios.isAxiosError(error)) {
    statusCode = error.response?.status;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = 'An unknown error occurred';
  }

  console.error(
    `[${method.toUpperCase()} Error] URL: ${url}, Status Code: ${statusCode || 'N/A'}, Message: ${message}`
  );
};

/********************************************************************************************************************************
 *                                                         HTTP Service                                                         *
 ********************************************************************************************************************************/
type RequestConfig = AxiosRequestConfig & { version?: string };

export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(
    baseURL: string | undefined,
    timeout = 20000,
    headers = { 'Content-Type': 'application/json' }
  ) {
    if (isNil(baseURL)) throw new Error('A valid baseURL must be provided.');
    this.axiosInstance = axios.create({ baseURL, timeout, headers });
  }

  private async handleRequest<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<T> {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Accept = `application/json;v=${config.version || '1'}`;

    try {
      const response: AxiosResponse<T> = !data
        ? await this.axiosInstance[method](url, config)
        : await this.axiosInstance[method](url, data, config);
      return response.data;
    } catch (error) {
      errorLoggerHandler(method, url, error);
      throw error;
    }
  }

  public get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.handleRequest('get', url, undefined, config);
  }

  public post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.handleRequest('post', url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.handleRequest('put', url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.handleRequest('patch', url, data, config);
  }

  public delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.handleRequest('delete', url, undefined, config);
  }
}
