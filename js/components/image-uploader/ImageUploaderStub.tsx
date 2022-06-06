import React, { VFC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type PropsType = {
  placeholder: string;
};

const ImageUploaderStub: VFC<PropsType> = ({
  placeholder,
}) => (
  <div className="image-uploader-stub">
    <FontAwesomeIcon icon={solid('user-circle')} className="image-uploader-stub__icon" />
    <div className="image-uploader-stub__text">
      {placeholder}
    </div>
  </div>
);

export { ImageUploaderStub };
