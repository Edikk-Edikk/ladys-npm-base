import React from 'react';
import { FieldMetaState } from 'react-final-form';

type PropsType = {
  meta: FieldMetaState<number | string>,
};

const Error: React.FC<PropsType> = ({
  meta,
}) => {
  const error = meta.submitError || meta.error;

  return (
    <div className="invalid-feedback">
      {error}
    </div>
  );
};

export { Error };
