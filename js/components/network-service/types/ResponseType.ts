import { ResponseErrorType } from './ResponseErrorType';

type ResponseType<T> = {
  xhr: XMLHttpRequest,
  status: boolean,
  statusCode: number,
  data?: T,
  error?: ResponseErrorType,
  formErrors?: object,
  redirectUrl?: string,
};

export { ResponseType };
