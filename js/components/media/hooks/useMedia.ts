import { useState } from 'react';
import { MediaQueryAllQueryable, useMediaQuery } from 'react-responsive';

const useMedia = (settings: Partial<MediaQueryAllQueryable & { query?: string }>) => {
  const [state, setState] = useState<boolean | null>(null);
  const isMatch = useMediaQuery(settings, undefined, (matches) => {
    setState(matches);
  });
  return state ?? isMatch;
};

export default useMedia;
