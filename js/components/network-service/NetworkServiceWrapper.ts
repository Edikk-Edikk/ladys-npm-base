import { NetworkService } from './NetworkService';

class NetworkServiceWrapper {
  private networkService: NetworkService;

  init() {
    this.networkService = new NetworkService(process.env.API_URL);
  }

  getNetworkService(): NetworkService {
    return this.networkService;
  }
}

const networkServiceWrapper = new NetworkServiceWrapper();

export { networkServiceWrapper };
