import 'reflect-metadata';
import UniversalCookie from 'universal-cookie';
import { injectable } from 'inversify';

@injectable()
class Cookies {
  private cookies: UniversalCookie;

  constructor() {
    this.cookies = new UniversalCookie();
  }

  set(cookies?: string) {
    this.cookies = new UniversalCookie(cookies);
  }

  getCookies(): UniversalCookie {
    return this.cookies;
  }
}

export { Cookies };
