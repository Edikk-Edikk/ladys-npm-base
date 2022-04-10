import { NetworkService } from './NetworkService';
import { AUTH_COOKIE_NAME } from '../../constants';
import { cookieWrapper } from '../cookies/CookiesWrapper';

class NetworkServiceWrapper {
  private networkService: NetworkService;

  init() {
    this.networkService = new NetworkService(process.env.API_URL, cookieWrapper.getCookies().get(AUTH_COOKIE_NAME));
  }

  getNetworkService(): NetworkService {
    return this.networkService;
  }
}

const networkServiceWrapper = new NetworkServiceWrapper();

export { networkServiceWrapper };
