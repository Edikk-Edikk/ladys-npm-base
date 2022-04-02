import { BaseError } from './BaseError';

class ErrorWithRedirect extends BaseError {
  public redirectUrl: string;

  constructor(redirectUrl: string) {
    super();
    this.redirectUrl = redirectUrl;
  }
}

export { ErrorWithRedirect };
