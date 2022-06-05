import classNames from 'classnames';
import React from 'react';

type PropTypes = {
  sizeSm?: boolean;
};

const LoaderCircle: React.FC<PropTypes> = ({
  sizeSm,
}) => (
  <span
    className={classNames(
      'loader-circle',
      { 'loader-circle_sm': sizeSm },
    )}
  />
);

export { LoaderCircle };
