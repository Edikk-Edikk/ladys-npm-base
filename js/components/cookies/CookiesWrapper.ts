import Cookies from 'universal-cookie';

class CookiesWrapper {
  private cookies: Cookies;

  init(cookies?: string) {
    this.cookies = new Cookies(cookies);
  }

  getCookies(): Cookies {
    return this.cookies;
  }
}

const cookieWrapper = new CookiesWrapper();

export { cookieWrapper };
