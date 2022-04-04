import queryParse from './queryParse';
import queryBuild from './queryBuild';
import isPlainObject from 'lodash/isPlainObject';
import uniq from 'lodash/uniq';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const queryAppendParam = <R extends string | object>(
  query: string | object,
  paramName: string,
  paramValue: string | number | string[] | number[] | object,
): R => {
  const newQuery: object = isObject(query) ? { ...query } : queryParse(query);
  const existingValue = newQuery[paramName] ?? null;

  if (paramName in newQuery && (isObject(existingValue) || isArray(existingValue))) {
    let newExistingValue;
    if (isPlainObject(paramValue)) {
      newExistingValue = { ...newQuery[paramName], ...paramValue as object };
    } else if (isArray(paramValue)) {
      newExistingValue = uniq([...newQuery[paramName], ...paramValue]);
    } else {
      newExistingValue = { ...newQuery[paramName], paramValue };
    }
    newQuery[paramName] = newExistingValue;
  } else {
    newQuery[paramName] = paramValue;
  }
  return (isObject(query) ? newQuery : queryBuild(newQuery)) as R;
};

export default queryAppendParam;
