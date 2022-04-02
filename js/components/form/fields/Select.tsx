import { FieldProps } from 'react-final-form';
import React from 'react';
import { Select as SelectSimple } from './simple/Select';
import { SelectType } from './types/SelectType';
import Field from './Field';

type PropsType = SelectType & {
  // @ts-ignore
  fieldProps?: Omit<FieldProps<any, any, HTMLInputElement>, 'name'>,
  additionalClassName?: string,
}

const Select: React.FC<PropsType> = ({
  name,
  fieldProps,
  additionalClassName,
  placeholder,
  ...props
}) => (
  <Field
    name={name}
    parse={(value) => (value === placeholder ? null : value)}
    {...fieldProps}
    render={({
      input,
      meta,
    }) => (
      <SelectSimple
        error={meta.submitError || meta.error}
        additionalClassName={additionalClassName}
        placeholder={placeholder}
        {...input}
        {...props}
      />
    )}
  />
);

export { Select };
