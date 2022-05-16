import imageUploaderStubCss from './assets/image-uploader-stub.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React, { VFC } from 'react';

type PropsType = {
  placeholder: string;
};

const ImageUploaderStub: VFC<PropsType> = ({
  placeholder,
}) => (
  <div className={imageUploaderStubCss.imageUploaderStub}>
    <FontAwesomeIcon icon={faUserCircle} className={imageUploaderStubCss.imageUploaderStub__stubIcon} />
    <div className={imageUploaderStubCss.imageUploaderStub__text}>
      {placeholder}
    </div>
  </div>
);

export { ImageUploaderStub };
