import URLParse from 'url-parse';
import { queryParse } from './queryParse';
import { queryBuild } from './queryBuild';

const { toString } = URLParse.prototype;
URLParse.prototype.toString = function newToString(URLParseStringify = queryBuild): string {
  return toString.call(this, URLParseStringify);
};
const urlParse = (url: string): URLParse<object | null> => new URLParse(url, {}, queryParse);

export { urlParse };
