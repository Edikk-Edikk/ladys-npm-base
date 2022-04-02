class BaseError {
  constructor(...args) {
    Error.apply(this, args);
  }
}

BaseError.prototype = new Error();

export { BaseError };
