import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useField, useForm } from 'react-final-form';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { VARIANT_SELECT2 } from './constants';
import { SubjectChangeDataType } from './types/SubjectChangeDataType';
import { DepDropDownDefaultPropsType } from './types/DepDropDownDefaultPropsType';
import { DepDropDownType } from './types/DepDropDownType';
import { DepDropDownPropsType } from './types/DepDropDownPropsType';
import { ValueType } from './types/ValueType';
import { HandlersType } from './types/HandlersType';
import { Field } from '../Field';
import { DepDropDownContent } from './DepDropDownContent';
import { DropDownDataType } from '../types/DropDownDataType';

const defaultProps: DepDropDownDefaultPropsType = {
  multiple: false,
  variant: VARIANT_SELECT2,
};

const DepDropDown: DepDropDownType = forwardRef<HandlersType, DepDropDownPropsType>(({
  initialData,
  label,
  isRequired,
  name,
  dependency,
  placeholder,
  variant,
  multiple,
  url,
  select2Options,
}, forwardedRef) => {
  const subjectChange = useMemo(() => new Subject<SubjectChangeDataType>(), [name]);
  const field = useField(name);
  const form = useForm();
  const [data, setData] = useState(initialData);
  // @ts-ignore
  const networkService = useNetworkService();

  useImperativeHandle(forwardedRef, () => ({
    subscribe: (handler): Subscription => subjectChange.subscribe(handler),
    getValue: () => field.input.value,
  }));

  const handlerDependencyChange = (subjectChangeData: SubjectChangeDataType) => {
    networkService.get<{
      data: DropDownDataType,
      value: ValueType,
    }>(url, {
      params: {
        dependencyValue: subjectChangeData.value,
        value: field.input.value,
      },
    }).then((response) => {
      setData(response.data.data);
      form.mutators.setValue(name, response.data.value);
      subjectChange.next({
        value: response.data.value,
        name,
      });
    }).catch(() => {
      if (subjectChangeData.previousValue) {
        form.mutators.setValue(subjectChangeData.name, subjectChangeData.previousValue);
      }
    });
  };

  useEffect(() => {
    if (!dependency?.current) {
      return null;
    }

    if (!url) {
      throw new Error('Property {url} is required for dependency logic');
    }

    const subscription = dependency.current.subscribe(handlerDependencyChange);
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [dependency, field]);

  const handlerChange = (value: ValueType) => {
    subjectChange.next({
      previousValue: field.input.value,
      value,
      name: field.input.name,
    });
  };

  const getSelect2PreparedOptions = () => {
    const newSelect2Options = { ...select2Options };

    if (dependency && dependency.current) {
      if ('ajax' in newSelect2Options) {
        const dependencyValue = dependency.current.getValue();
        // @ts-ignore
        const urlParts = urlParse(newSelect2Options.ajax.url as string);

        const { query } = urlParts;
        const newQuery = {
          ...query,
          dependencyValue,
        };
        urlParts.set('query', newQuery);

        newSelect2Options.ajax.url = urlParts.href;
      }
    }

    return newSelect2Options;
  };

  const getPlaceholder = () => placeholder || 'Make a choice';

  return (
    <div>
      <Field
        name={name}
        type="select"
        render={({ input, meta }) => (
          <DepDropDownContent
            label={label}
            isRequired={isRequired}
            variant={variant}
            input={input}
            meta={meta}
            data={data}
            placeholder={getPlaceholder()}
            multiple={multiple}
            onChange={handlerChange}
            select2Options={getSelect2PreparedOptions()}
          />
        )}
      />
    </div>
  );
});

DepDropDown.defaultProps = defaultProps;

export { DepDropDown };
