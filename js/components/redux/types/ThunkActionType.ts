import { History } from 'history';
import { ThunkAction as ThunkActionBase } from 'redux-thunk';
import { networkService } from '../../network-service';

type ExtraArgument = {
  networkService: typeof networkService,
  history: History;
};

type ThunkActionType<S extends object, R = Promise<any> | void> = ThunkActionBase<
  R,
  S,
  ExtraArgument,
  any
>;

export { ThunkActionType };
