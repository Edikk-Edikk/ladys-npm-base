import { parse, ParsedQs } from 'qs';

const queryParse = (query: string): ParsedQs => parse(query, {
  ignoreQueryPrefix: true,
  interpretNumericEntities: false,
  strictNullHandling: true,
  plainObjects: true,
  arrayLimit: 100,
});

export { queryParse };
