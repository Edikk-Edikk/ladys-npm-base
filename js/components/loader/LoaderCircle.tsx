import classNames from 'classnames';
import React from 'react';
import loaderCircleCss from './loader-circle.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropTypes = {
  sizeSm?: boolean;
};

const LoaderCircle: React.FC<PropTypes> = ({
  sizeSm,
}) => {
  useStyles(loaderCircleCss);
  return (
    <span
      className={classNames(
        loaderCircleCss.loaderCircle,
        { [loaderCircleCss.loaderCircleSm]: sizeSm },
      )}
    />
  );
};

export { LoaderCircle };
