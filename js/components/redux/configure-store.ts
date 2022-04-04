import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import { reducerRegistry } from './ReducerRegistry';
import { ReducersType } from './types/ReducersType';
import { history } from '../history';
import { networkService } from '../network-service';

const configureStore = (initialState = {}): Store => {
  const combine = (reducers: ReducersType) => {
    const newReducers = { ...reducers };
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach((item: string) => {
      if (reducerNames.indexOf(item) === -1) {
        newReducers[item] = (state: object = null) => state;
      }
    });
    newReducers.router = connectRouter(history);
    return combineReducers<object>(newReducers);
  };

  const reducer = combine(reducerRegistry.getReducers());

  const middleware = [
    thunk.withExtraArgument({ networkService, history }),
    routerMiddleware(history),
  ];
  const enhancers = [
    applyMiddleware(...middleware),
  ];

  const store = createStore(reducer, initialState, compose(...enhancers));

  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combine(reducers));
  });

  return store;
};

export { configureStore };
