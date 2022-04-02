import { Reducer } from 'redux';
import { ReducersType } from './types/ReducersType';
import { EmitChangeCallbackType } from './types/EmitChangeCallbackType';

class ReducerRegistry {
  private emitChange: EmitChangeCallbackType;

  private reducers: ReducersType = {};

  getReducers(): ReducersType {
    return this.reducers;
  }

  register(name: string, reducer: Reducer) {
    this.reducers = { ...this.reducers, [name]: reducer };
    if (this.emitChange) {
      this.emitChange(this.reducers);
    }
  }

  unregister(name: string) {
    const reducers = { ...this.reducers };
    delete reducers[name];
    this.reducers = reducers;
    if (this.emitChange) {
      this.emitChange(this.reducers);
    }
  }

  setChangeListener(listner: EmitChangeCallbackType) {
    this.emitChange = listner;
  }
}

const reducerRegistry = new ReducerRegistry();

export { reducerRegistry };
