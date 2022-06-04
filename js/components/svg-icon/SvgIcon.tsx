import React, { VFC } from 'react';
import classNames from 'classnames';
import svgIconCss from './assets/svg-icon.module.scss';

type PropsType = {
  icon: typeof React.Component;
  additionalClassName?: string;
  spin?: boolean;
};

const SvgIcon: VFC<PropsType> = ({
  icon,
  additionalClassName,
  spin,
}) => {
  const Icon = icon;

  return (
    <Icon
      className={classNames(
        svgIconCss.svgIcon,
        { [svgIconCss.svgIcon_spin]: spin },
        additionalClassName,
      )}
    />
  );
};

export { SvgIcon };
