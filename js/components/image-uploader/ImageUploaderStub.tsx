import imageUploaderStubCss from './assets/image-uploader-stub.module.scss';
// @ts-ignore
import CircleUserSvg from '@fortawesome/fontawesome-free/svgs/solid/circle-user.svg';
import React, { VFC } from 'react';
import { SvgIcon } from '../svg-icon/SvgIcon';

type PropsType = {
  placeholder: string;
};

const ImageUploaderStub: VFC<PropsType> = ({
  placeholder,
}) => (
  <div className={imageUploaderStubCss.imageUploaderStub}>
    <SvgIcon icon={CircleUserSvg} additionalClassName={imageUploaderStubCss.imageUploaderStub__stubIcon}/>
    <div className={imageUploaderStubCss.imageUploaderStub__text}>
      {placeholder}
    </div>
  </div>
);

export { ImageUploaderStub };
