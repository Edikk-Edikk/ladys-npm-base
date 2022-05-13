import { ConfigType } from './types/ConfigType';
import { ResponseType } from './types/ResponseType';

interface NetworkServiceInterface {
  get<T>(url: string, config?: ConfigType): Promise<ResponseType<T>>;

  post<T>(url: string, data?: object, config?: ConfigType): Promise<ResponseType<T>>;
}

export { NetworkServiceInterface };
