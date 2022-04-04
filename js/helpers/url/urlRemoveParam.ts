import { urlParse } from './urlParse';

const urlRemoveParam = (url: string, paramName: string, paramValue?: string): string => {
  const urlParts = urlParse(url);

  if (!(paramName in urlParts.query)) {
    return urlParts.href;
  }

  const newQuery = { ...urlParts.query };
  if (paramValue) {
    const params = newQuery[paramName];
    Object.entries(params).forEach(([name, value]) => {
      if (value === paramValue) {
        delete params[name];
      }
    });
  } else {
    delete newQuery[paramName];
  }

  urlParts.set('query', newQuery);
  return urlParts.href;
};

export { urlRemoveParam };
