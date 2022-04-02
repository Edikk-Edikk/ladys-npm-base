import * as React from 'react';
import { useLayoutEffect, useMemo, useState } from 'react';
import { connect as connectDefault } from 'react-redux';
import { ConnectConfigType, ReducerConfigType } from './types/ConnectConfigType';
import { reducerRegistry } from './ReducerRegistry';

function connect<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
  component,
  config: ConnectConfigType<TStateProps, TDispatchProps, TOwnProps, State>,
) {
  return (props) => {
    const [isInit, setIsInit] = useState<boolean>(false);

    const register = () => {
      if (Array.isArray(config.reducers)) {
        config.reducers.forEach(({
          name,
          reducer,
        }) => {
          reducerRegistry.register(name, reducer);
        });
        return;
      }

      reducerRegistry.register(config.reducers.name, config.reducers.reducer);
    };

    const unregisterReducer = (reducerConfig: ReducerConfigType) => {
      if (reducerConfig.isNeedUnregister === false) {
        return;
      }
      reducerRegistry.unregister(reducerConfig.name);
    };

    const unregister = () => {
      if (Array.isArray(config.reducers)) {
        config.reducers.forEach((reducerConfig) => {
          unregisterReducer(reducerConfig);
        });
        return;
      }

      unregisterReducer(config.reducers);
    };

    useLayoutEffect(() => {
      if (!config.reducers) {
        setIsInit(true);
        return undefined;
      }

      register();
      setIsInit(true);

      return () => {
        setIsInit(false);
        unregister();
      };
    }, []);

    const Component = useMemo(() => connectDefault<TStateProps, TDispatchProps>(
      config.mapStateToProps,
      config.mapDispatchToProps,
    )(component), []);

    if (!isInit) {
      return null;
    }

    return (
      <>
        {/* eslint-disable-next-line */}
        <Component {...props} />
      </>
    );
  };
}

export { connect };
