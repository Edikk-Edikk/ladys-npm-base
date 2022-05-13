import { container } from '../inversify/inversify.config';
import { INVERSIFY_TYPES } from '../inversify/types';
import { NetworkServiceInterface } from './NetworkServiceInterface';

const useNetworkService = () => {
  try {
    return container.get<NetworkServiceInterface>(INVERSIFY_TYPES.networkService);
  } catch (e) {
    return undefined;
  }
};

export { useNetworkService };
