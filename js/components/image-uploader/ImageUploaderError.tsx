import { useFormState } from 'react-final-form';
import get from 'lodash/get';
import imageUploaderCss from './assets/image-uploader.module.scss';
import React, { VFC } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropsType = {
  name: string;
};

const ImageUploaderError: VFC<PropsType> = ({
  name,
}) => {
  useStyles(imageUploaderCss);
  const { submitErrors, errors } = useFormState();
  const error = get(submitErrors, name) || get(errors, name);
  if (!error) {
    return null;
  }

  return (
    <div className={imageUploaderCss.imageUploader__error}>
      {error}
    </div>
  );
};

export { ImageUploaderError };
