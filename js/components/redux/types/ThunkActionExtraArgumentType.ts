import { History } from 'history';
import { NetworkServiceInterface } from '../../network-service';

type ThunkActionExtraArgumentType = {
  networkService: NetworkServiceInterface,
  history: History;
};

export { ThunkActionExtraArgumentType };
