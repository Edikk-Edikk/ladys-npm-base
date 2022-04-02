import React from 'react';

type PropsType = React.LabelHTMLAttributes<any> & {
  label: string | number,
  isRequired?: boolean,
}

const Label: React.VFC<PropsType> = ({
  label,
  isRequired,
  htmlFor,
}) => {
  if (!label) {
    return null;
  }

  return (
    <label className="form-label" htmlFor={htmlFor}>
      {label}
      {isRequired ? <span className="text-danger"> *</span> : null}
    </label>
  );
};

export { Label };
