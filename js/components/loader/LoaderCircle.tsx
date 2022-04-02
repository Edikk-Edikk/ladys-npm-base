import classNames from 'classnames';
import React from 'react';
import loaderCircleCss from './loader-circle.module.scss';

type PropTypes = {
  sizeSm?: boolean;
};

const LoaderCircle: React.FC<PropTypes> = ({
  sizeSm,
}) => (
  <span
    className={classNames(
      loaderCircleCss.loaderCircle,
      { [loaderCircleCss.loaderCircleSm]: sizeSm },
    )}
  />
);

export { LoaderCircle };
