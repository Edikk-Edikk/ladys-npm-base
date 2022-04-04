import { IStringifyOptions, stringify } from 'qs';

const queryBuild = (query: object, options: IStringifyOptions = {}): string => {
  const optionsDefault: IStringifyOptions = {
    arrayFormat: 'brackets',
  };
  const optionsNew: IStringifyOptions = { ...optionsDefault, ...options };
  return stringify(query, optionsNew);
};

export { queryBuild };
