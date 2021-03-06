import React, { forwardRef, useEffect, useRef } from 'react';
import classNames from 'classnames';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import { InputPropsType } from '../types/InputPropsType';

type PropsType = InputPropsType & {
  error?: string,
};

const defaultProps = {
  type: 'text',
  className: 'form-control',
};

const Input: React.FC<PropsType> = forwardRef(({
  name,
  placeholder,
  value,
  type,
  error,
  className,
  additionalClassName,
  inputmask,
  onChange,
  errorAdditionalClassName,
}, forwardedRef) => {
  const refInput = useRef<HTMLInputElement>();
  const refs = useMergedRefs(forwardedRef, refInput);

  useEffect(() => {
    if (!inputmask) {
      return;
    }

    import('inputmask').then((module) => {
      const Inputmask = module.default;
      Inputmask(inputmask).mask(refInput.current);
    });
  }, []);

  return (
    <>
      <input
        ref={refs}
        type={type}
        name={name}
        className={classNames(
          className,
          additionalClassName,
          { 'is-invalid': error },
        )}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={onChange  }
      />
      <div className={classNames('invalid-feedback', errorAdditionalClassName)}>
        {error}
      </div>
    </>
  );
});

Input.defaultProps = defaultProps;

export { Input };
