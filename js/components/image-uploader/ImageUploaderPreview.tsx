import React, { VFC } from 'react';
import imageUploaderCss from 'reactComponents/stories/components/stories-form/image-uploader.module.scss';

type PropsType = {
  preview: string;
};

const ImageUploaderPreview: VFC<PropsType> = ({
  preview,
}) => {
  if (!preview) {
    return null;
  }

  return <img src={preview} className={imageUploaderCss.imageUploader__preview} />;
};

export { ImageUploaderPreview };
