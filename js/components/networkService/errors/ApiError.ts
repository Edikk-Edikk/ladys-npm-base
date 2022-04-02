import { BaseError } from './BaseError';
import { ResponseErrorType } from '../types/ResponseErrorType';

class ApiError extends BaseError {
  public name: string;

  public message: string;

  public status: number;

  public error: ResponseErrorType | string;

  constructor(error: ResponseErrorType | string, status:number = 500) {
    super();
    this.error = error;
    this.status = status;
    if (typeof error === 'string') {
      this.name = error;
      this.message = error;
    } else {
      this.name = error.name;
      this.message = error.message;
    }
  }

  isNotFound() {
    return this.status === 404;
  }
}

export { ApiError };
