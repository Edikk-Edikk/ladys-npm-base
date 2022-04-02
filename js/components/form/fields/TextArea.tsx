import React, { ChangeEvent } from 'react';
import { TextArea as TextAreaSimple } from './simple/TextArea';
import { FieldProps } from 'react-final-form';
import Field from './Field';

type PropsType = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  // @ts-ignore
  fieldProps?: Omit<FieldProps<any, any, HTMLInputElement>, 'name'>;
  additionalClassName?: string;
};

const TextArea: React.FC<PropsType> = ({
  name,
  placeholder,
  onChange,
  fieldProps,
  ...props
}) => (
  <Field
    name={name}
    {...fieldProps}
    render={({ input, meta }) => {
      const handlerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        input.onChange(e);
        if (onChange) {
          onChange(e);
        }
      };

      return (
        <TextAreaSimple
          error={meta.submitError || meta.error}
          placeholder={placeholder}
          rows={5}
          {...input}
          {...props}
          onChange={handlerChange}
        />
      );
    }}
  />
);

export { TextArea };
