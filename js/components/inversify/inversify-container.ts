import 'reflect-metadata';
import { Container } from 'inversify';
import { Cookies } from '../cookies';
import { INVERSIFY_TYPES } from './types';

const inversifyContainer = new Container();

inversifyContainer.bind<Cookies>(INVERSIFY_TYPES.cookies).to(Cookies).inSingletonScope();

export { inversifyContainer };
