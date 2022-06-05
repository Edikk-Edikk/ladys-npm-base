import React, { VFC } from 'react';

type PropsType = {
  preview: string;
};

const ImageUploaderPreview: VFC<PropsType> = ({
  preview,
}) => {
  if (!preview) {
    return null;
  }

  return <img src={preview} className="image-uploader__preview" />;
};

export { ImageUploaderPreview };
