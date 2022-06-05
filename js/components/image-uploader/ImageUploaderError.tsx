import { useFormState } from 'react-final-form';
import get from 'lodash/get';
import React, { VFC } from 'react';

type PropsType = {
  name: string;
};

const ImageUploaderError: VFC<PropsType> = ({
  name,
}) => {
  const { submitErrors, errors } = useFormState();
  const error = get(submitErrors, name) || get(errors, name);
  if (!error) {
    return null;
  }

  return (
    <div className="image-uploader__error">
      {error}
    </div>
  );
};

export { ImageUploaderError };
