import { inversifyContainer } from '../inversify';
import { INVERSIFY_TYPES } from '../inversify';
import { Cookies } from './Cookies';

const useCookies = () => inversifyContainer.get<Cookies>(INVERSIFY_TYPES.cookies);

export { useCookies };
