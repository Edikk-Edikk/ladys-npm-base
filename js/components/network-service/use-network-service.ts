import { inversifyContainer } from '../inversify';
import { INVERSIFY_TYPES } from '../inversify';
import { NetworkServiceInterface } from './NetworkServiceInterface';

const useNetworkService = () => {
  try {
    return inversifyContainer.get<NetworkServiceInterface>(INVERSIFY_TYPES.networkService);
  } catch (e) {
    return undefined;
  }
};

export { useNetworkService };
