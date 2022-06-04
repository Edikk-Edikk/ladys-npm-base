import React, { VFC } from 'react';
import imageUploaderCss from './assets/image-uploader.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropsType = {
  preview: string;
};

const ImageUploaderPreview: VFC<PropsType> = ({
  preview,
}) => {
  useStyles(imageUploaderCss);
  if (!preview) {
    return null;
  }

  return <img src={preview} className={imageUploaderCss.imageUploader__preview} />;
};

export { ImageUploaderPreview };
