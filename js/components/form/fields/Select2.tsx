import React, { createRef, useEffect, useState } from 'react';
import { FieldInputProps, useForm } from 'react-final-form';
import $ from 'jquery';
import 'select2';
import { Select2 as Select2Simple } from './simple/Select2';
import classNames from 'classnames';
import { Select2PropsType } from './types/Select2PropsType';

type PropsType = FieldInputProps<any> & Select2PropsType & {
  onChange: (value: any) => void,
}

const defaultProps = {
  className: 'select2-hidden-accessible',
};

const Select2: React.FC<PropsType> = ({
  name,
  options,
  className,
  additionalClassName,
  ...props
}) => {
  const form = useForm();
  const ref = createRef<HTMLSelectElement>();
  const [isUnselecting, setIsUnselecting] = useState<boolean>(false);

  const changeValue = (value) => {
    form.mutators.setValue(name, value);
    props.onChange(value);
  };

  const handlerUnselecting = (e) => {
    setIsUnselecting(true);

    let newValue;
    if (options.multiple) {
      const selectedValues = form.getState().values[name] || [];
      newValue = selectedValues.filter(
        (selectedValue) => String(selectedValue) !== String(e.params.args.data.id),
      );
    } else {
      newValue = null;
    }
    changeValue(newValue);
  };

  const handlerSelecting = (e) => {
    let newValue;
    if (options.multiple) {
      const selectedValues = form.getState().values[name] || [];
      newValue = selectedValues.concat([e.params.args.data.id]);
    } else {
      newValue = e.params.args.data.id;
    }
    changeValue(newValue);
  };

  const handlerOpening = (e) => {
    if (isUnselecting) {
      e.preventDefault();
      setIsUnselecting(false);
      return;
    }
    props.onFocus();
  };

  const handlerClose = () => {
    props.onBlur();
  };

  useEffect(() => {
    $(ref.current).off('select2:selecting')
      .on('select2:selecting', handlerSelecting)
      .off('select2:unselecting')
      .on('select2:unselecting', handlerUnselecting)
      .off('select2:opening')
      .on('select2:opening', handlerOpening)
      .off('select2:close')
      .on('select2:close', handlerClose);
  });

  return (
    <Select2Simple
      ref={ref}
      name={name}
      options={options}
      className={classNames(className, additionalClassName)}
      {...props}
    />
  );
};

Select2.defaultProps = defaultProps;

export { Select2 };
