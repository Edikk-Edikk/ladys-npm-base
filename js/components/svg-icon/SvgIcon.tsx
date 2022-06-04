import React, { VFC } from 'react';
import classNames from 'classnames';
import svgIconCss from './assets/svg-icon.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

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
  useStyles(svgIconCss);
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
