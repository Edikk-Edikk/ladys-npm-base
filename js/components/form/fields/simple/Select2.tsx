import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import $ from 'jquery';
import 'select2';
import isEqual from 'lodash/isEqual';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import { Select2PropsType } from '../types/Select2PropsType';
import { networkServiceWrapper } from '../../../network-service/NetworkServiceWrapper';

const Select2 = forwardRef<any, Select2PropsType>(({
  data,
  value,
  options,
  ...props
}, ref) => {
  const [currentData] = useState(data);
  const innerRef = createRef<HTMLSelectElement>();
  const [oldOptions, setOldOptions] = useState<object>();
  const refs = useMergedRefs(ref, innerRef);
  const language = useMemo(() => {
    const noResults = () => 'Nothing found';
    const inputTooShort = (args) => `Please enter ${args.minimum - args.input.length} or more characters`;
    const searching = () => 'Loading...';
    const maximumSelected = (args) => `You can only select ${args.maximum}`;
    return {
      noResults,
      inputTooShort,
      searching,
      maximumSelected,
    };
  }, []);

  const isAjax = () => 'ajax' in options;

  const transport = useCallback((settings, success, failure) => {
    networkServiceWrapper.getNetworkService().get(settings.url, {
      params: settings.data,
    }).then((response) => {
      success(response.data);
    }).catch((error) => {
      failure(error);
    });
  }, []);

  const getPrepareDOptions = () => {
    const newOptions = {
      width: '100%',
      language,
      ...options,
    };

    if (isAjax()) {
      if (!('minimumInputLength' in newOptions)) {
        newOptions.minimumInputLength = 2;
      }
      if (!('transport' in options.ajax)) {
        newOptions.ajax.transport = transport;
      }
    }

    if (!('placeholder' in newOptions)) {
      newOptions.placeholder = 'Make a choice';
    }

    return newOptions;
  };

  useEffect(() => {
    // @ts-ignore
    $(innerRef.current).select2(getPrepareDOptions());
  }, []);

  useEffect(() => {
    const preparedOptions = getPrepareDOptions();
    if (oldOptions && isEqual(oldOptions, preparedOptions)) {
      return;
    }

    setOldOptions(preparedOptions);

    if (!oldOptions) {
      return;
    }

    // @ts-ignore
    $(innerRef.current).select2(preparedOptions);
  }, [options]);

  const updateValue = () => {
    $(innerRef.current).val(value).trigger('change');
  };

  useEffect(() => {
    updateValue();
  }, [value]);

  const makeOption = (item) => {
    const {
      id,
      text,
      ...itemParams
    } = item;
    return (<option key={`option-${id}`} value={id} {...itemParams}>{text}</option>);
  };

  const renderOptions = () => {
    if (!currentData) {
      return null;
    }

    return currentData.map((item) => makeOption(item));
  };

  return (
    <select
      ref={refs}
      {...props}
    >
      {renderOptions()}
    </select>
  );
});

export { Select2 };
