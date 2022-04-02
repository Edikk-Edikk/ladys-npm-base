import React, { forwardRef } from 'react';
import classNames from 'classnames';

type PropsType = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
  additionalClassName?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, PropsType>(({
  name,
  placeholder,
  value,
  error,
  additionalClassName,
  ...props
}, ref) => {
  return (
    <div>
        <textarea
          ref={ref}
          name={name}
          className={classNames('form-control', additionalClassName, { 'is-invalid': error })}
          placeholder={placeholder}
          id={name}
          value={value}
          {...props}
        />
      <div className="invalid-feedback">
        {error}
      </div>
    </div>
  );
});

export { TextArea };
