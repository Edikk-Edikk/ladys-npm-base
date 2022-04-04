import { urlParse } from './urlParse';
import { queryAppendParam } from './queryAppendParam';

const urlAppendParam = (
  url: string,
  paramName: string,
  paramValue: string | number | string[] | number[] | object,
): string => {
  const urlParts = urlParse(url);
  const newQuery = queryAppendParam(urlParts.query, paramName, paramValue);
  urlParts.set('query', newQuery);
  return urlParts.href;
};

export { urlAppendParam };
