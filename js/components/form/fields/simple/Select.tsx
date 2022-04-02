import React from 'react';
import classNames from 'classnames';
import { SelectType } from '../types/SelectType';

type PropsType = SelectType & {
  error?: string,
  additionalClassName?: string,
};

const defaultProps = {
  isRequired: false,
  className: 'form-control',
};

const Select: React.FC<PropsType> = ({
  data,
  name,
  placeholder,
  value,
  error,
  className,
  additionalClassName,
  ...props
}) => {
  const makeOption = (item) => {
    const {
      id,
      text,
      ...itemParams
    } = item;
    return (<option key={`option-${id}`} value={id} {...itemParams}>{text}</option>);
  };

  const renderOptions = () => {
    const options = data.map((item) => makeOption(item));

    if (placeholder) {
      options.unshift(makeOption({
        text: placeholder,
      }));
    }

    return options;
  };

  return (
    <>
      <select
        name={name}
        className={classNames(className, additionalClassName, { 'is-invalid': error })}
        value={value}
        id={name}
        {...props}
      >
        {renderOptions()}
      </select>
      <div className="invalid-feedback">
        {error}
      </div>
    </>
  );
};

Select.defaultProps = defaultProps;

export { Select };
