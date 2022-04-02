type ResponseErrorType = {
  code?: number,
  file?: string,
  line?: number,
  message: string,
  name?: string,
  'stack-trace'?: Array<string>,
  type?: string,
}

export { ResponseErrorType };
