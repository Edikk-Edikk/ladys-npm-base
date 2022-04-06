import { Field as FieldDefault, FieldProps, FieldRenderProps } from 'react-final-form';
import React, { useCallback } from 'react';

type PropsType = FieldProps<any, FieldRenderProps<string>>;

const Field: React.FC<PropsType> = ({
  defaultValue,
  ...props
}) => {
  const parse = useCallback((value) => (value), []);

  // noinspection TypeScriptValidateTypes
  return (
    // eslint-disable-next-line
    <FieldDefault parse={parse} defaultValue={defaultValue ?? null} {...props} />
  );
};

export { Field };
