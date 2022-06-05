import React, { VFC } from 'react';
import classNames from 'classnames';

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
        'svg-icon',
        { 'svg-icon_spin': spin },
        additionalClassName,
      )}
    />
  );
};

export { SvgIcon };
