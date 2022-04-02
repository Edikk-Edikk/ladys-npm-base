import { Reducer } from 'redux';
import { MapDispatchToPropsNonObject, MapStateToPropsParam } from 'react-redux';

type ReducerConfigType = {
  name: string,
  reducer: Reducer,
  isNeedUnregister?: boolean,
};

type ConnectConfigType<TStateProps, TDispatchProps, TOwnProps, State> = {
  reducers?: ReducerConfigType | ReducerConfigType[],
  mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps?: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
};

export {
  ConnectConfigType,
  ReducerConfigType,
};
