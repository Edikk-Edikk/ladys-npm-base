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
  <div className="image-uploader-stub">
    <SvgIcon icon={CircleUserSvg} additionalClassName="image-uploader-stub__icon" />
    <div className="image-uploader-stub__text">
      {placeholder}
    </div>
  </div>
);

export { ImageUploaderStub };
