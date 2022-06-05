import React, { VFC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faUserCircle from '@fortawesome/free-solid-svg-icons/faUserCircle';

type PropsType = {
  placeholder: string;
};

const ImageUploaderStub: VFC<PropsType> = ({
  placeholder,
}) => (
  <div className="image-uploader-stub">
    <FontAwesomeIcon icon={faUserCircle} className="image-uploader-stub__icon" />
    <div className="image-uploader-stub__text">
      {placeholder}
    </div>
  </div>
);

export { ImageUploaderStub };
