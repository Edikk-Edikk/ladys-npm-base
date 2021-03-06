import React from 'react';

type PropsType = React.LabelHTMLAttributes<any> & {
  label: string | number,
  className?: string;
  isRequired?: boolean,
}

const defaultProps = {
  className: 'form-label',
};

const Label: React.VFC<PropsType> = ({
  label,
  isRequired,
  htmlFor,
  className
}) => {
  if (!label) {
    return null;
  }

  return (
    <label className={className} htmlFor={htmlFor}>
      {label}
      {isRequired ? <span className="text-danger"> *</span> : null}
    </label>
  );
};

Label.defaultProps = defaultProps;

export { Label };
