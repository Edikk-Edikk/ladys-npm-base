import { ThunkAction as ThunkActionBase } from 'redux-thunk';
import { ThunkActionExtraArgumentType } from './ThunkActionExtraArgumentType';

type ThunkActionType<
  State extends object,
  ExtraThunkArg = ThunkActionExtraArgumentType,
  ReturnType = Promise<any> | void,
> = ThunkActionBase<ReturnType, State, ExtraThunkArg, any>;

export { ThunkActionType };
