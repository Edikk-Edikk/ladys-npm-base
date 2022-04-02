import { FieldProps } from 'react-final-form';
import React, { ChangeEvent, forwardRef } from 'react';
import { Input as InputSimple } from './simple/Input';
import { InputPropsType } from './types/InputPropsType';
import Field from './Field';

type PropsType = InputPropsType & {
  // @ts-ignore
  fieldProps?: Omit<FieldProps<any, any, HTMLInputElement>, 'name'>;
}

const Input: React.FC<PropsType> = forwardRef(({
  name,
  type,
  fieldProps,
  additionalClassName,
  onChange,
  value,
  ...props
}, ref) => (
  <Field
    name={name}
    type={type}
    value={value}
    {...fieldProps}
    render={({
      input,
      meta,
    }) => {
      const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        input.onChange(e);
        if (onChange) {
          onChange(e);
        }
      };

      return (
        <InputSimple
          ref={ref}
          error={meta.submitError || meta.error}
          additionalClassName={additionalClassName}
          value={value}
          {...input}
          {...props}
          onChange={handlerChange}
        />
      );
    }}
  />
));

export { Input };
